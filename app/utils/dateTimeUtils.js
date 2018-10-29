'use strict';

const moment = require('moment');

function WeekDayCalc(
  rangeStart,
  rangeEnd,
  weekdays,
  exclusions,
  inclusions,
  useIsoWeekday
) {
  this.rangeStart = moment(rangeStart);
  this.rangeEnd = moment(rangeEnd);
  this.exclusions = exclusions;
  this.inclusions = inclusions;
  this.useIsoWeekday = useIsoWeekday === true;
  if (this.rangeStart.isAfter(this.rangeEnd)) {
    throw new WeekDayCalcException('rangeStart is after rangeEnd');
  }
  this.weekdays = parseWeekdays(weekdays, this.useIsoWeekday);
}
//>>>>>>>>>>>>>>>>>>>>>>
WeekDayCalc.prototype.calculate = function () {
  let weekDaysCount = 0;
  const rangeStartWeekEnd = this.rangeStart.clone().endOf('week');
  const rangeEndWeekStart = this.rangeEnd.clone().startOf('week');

  if (
    rangeEndWeekStart.diff(rangeStartWeekEnd, 'days') < 30 ||
    this.exclusions ||
    this.inclusions
  ) {
    weekDaysCount = this.calculateIterative(
      this.rangeStart,
      this.rangeEnd,
      this.weekdays,
      this.exclusions,
      this.inclusions
    );
  }
  else {
    /* a little optimisation for longer time intervals - it works faster with intervals longer than one year */
    const wholeWeeksDiff = Math.round(
      rangeEndWeekStart.diff(rangeStartWeekEnd, 'weeks', true)
    );
    weekDaysCount += wholeWeeksDiff * this.weekdays.length;
    weekDaysCount += this.calculateIterative(
      this.rangeStart,
      rangeStartWeekEnd,
      this.weekdays
    );
    weekDaysCount += this.calculateIterative(
      rangeEndWeekStart,
      this.rangeEnd,
      this.weekdays
    );
  }

  return weekDaysCount;
};
//<<<<<<<<<<<<
WeekDayCalc.prototype.calculateIterative = function (
  rangeStart,
  rangeEnd,
  weekdays,
  exclusions,
  inclusions
) {
  let weekDaysCount = 0;

  const day = rangeStart.clone();
  const str_exclusions = parseSet(exclusions);
  const str_inclusions = parseSet(inclusions);

  while (day.valueOf() <= rangeEnd.valueOf()) {
    const weekdayFunc = this.useIsoWeekday ? 'isoWeekday' : 'weekday';
    const dayString = day.format('YYYY-MM-DD');
    const included =
      str_inclusions.length !== 0 && str_inclusions.indexOf(dayString) >= 0;
    if (
      included ||
      (weekdays.indexOf(day[weekdayFunc]()) >= 0 &&
        (str_exclusions.length === 0 || str_exclusions.indexOf(dayString) < 0))
    ) {
      weekDaysCount++;
    }
    day.add(1, 'day');
  }
  return weekDaysCount;
};

function WeekDayCalcException(message) {
  this.message = message;
  this.name = 'WeekDayCalcException';
}
WeekDayCalcException.prototype = new Error();
WeekDayCalc.prototype.WeekDayCalcException = WeekDayCalcException;

function DaysSetConverter(
  rangeStart,
  weekdays,
  exclusions,
  inclusions,
  useIsoWeekday
) {
  this.rangeStart = moment(rangeStart);
  this.useIsoWeekday = useIsoWeekday === true;
  this.exclusions = exclusions;
  this.inclusions = inclusions;
  this.weekdays = parseWeekdays(weekdays, this.useIsoWeekday);
}
//>>>>>>>>>>>>>>
// /**
//  * Calculates the date of {workdays} from now excluding today
//  * @param daysToAdd
//  * @returns {Suite|*}
//  */
DaysSetConverter.prototype.calculate = function (daysToAdd) {
  let daysLeft = daysToAdd;
  const resultDate = this.rangeStart.clone();
  const str_exclusions = parseSet(this.exclusions);
  const str_inclusions = parseSet(this.inclusions);
  const weekdayFunc = this.useIsoWeekday ? 'isoWeekday' : 'weekday';
  if (daysLeft >= 0) {
    /* positive value - add days */
    while (daysLeft > 0) {
      resultDate.add(1, 'day');
      const included =
        str_inclusions.length !== 0 &&
        str_inclusions.indexOf(resultDate.format('YYYY-MM-DD')) >= 0;
      if (
        included ||
        (this.weekdays.indexOf(resultDate[weekdayFunc]()) >= 0 &&
          (str_exclusions.length === 0 ||
            str_exclusions.indexOf(resultDate.format('YYYY-MM-DD')) < 0))
      ) {
        daysLeft--;
      }
    }
  }
  else {
    /* negative value - subtract days */
    while (daysLeft < 0) {
      resultDate.subtract(1, 'day');
      const included =
        str_inclusions.length !== 0 &&
        str_inclusions.indexOf(resultDate.format('YYYY-MM-DD')) >= 0;
      if (
        included ||
        (this.weekdays.indexOf(resultDate[weekdayFunc]()) >= 0 &&
          (str_exclusions.length === 0 ||
            str_exclusions.indexOf(resultDate.format('YYYY-MM-DD')) < 0))
      ) {
        daysLeft++;
      }
    }
  }
  return resultDate;
};
//<<<<<<<<<<<<<<<<<<<
function DaysSetConverterException(message) {
  this.message = message;
  this.name = 'DaysSetConverterException';
}
DaysSetConverterException.prototype = new Error();
DaysSetConverter.prototype.DaysSetConverterException = DaysSetConverterException;

const parseWeekdays = function (weekdays, useIsoWeekday) {
  const validWeekdays = [];
  if (!weekdays) {
    throw new WeekDayCalcException('weekdays must be defined');
  }
  if (weekdays.length > 7) {
    throw new WeekDayCalcException(
      'Weekdays array exceeding week length of 7 days'
    );
  }
  for (let i = 0; i < weekdays.length; i++) {
    let weekday = weekdays[i];
    if (useIsoWeekday) {
      if (isNaN(weekday)) {
        throw new WeekDayCalcException(
          'isoWeekDayCalc accepts weekdays as numbers only, try using weekdayCalc if you need a locale aware behaviour'
        );
      }
      if (weekday < 1 || weekday > 7) {
        throw new WeekDayCalcException('The weekday is out of 1 to 7 range');
      }
    }
    else if (!isNaN(weekday)) {
      if (weekday < 0 || weekday > 6) {
        throw new WeekDayCalcException('The weekday is out of 0 to 6 range');
      }
    }
    else {
      weekday = moment()
        .day(weekday)
        .weekday();
    }
    if (validWeekdays.indexOf(weekday) >= 0) {
      throw new WeekDayCalcException('Weekdays set contains duplicate weekday');
    }
    validWeekdays.push(weekday);
  }
  return validWeekdays;
};

const parseSet = function (set) {
  const str_exclusions = [];
  if (set) {
    let i = 0;

    const l = set.length;
    for (; i < l; i++) {
      str_exclusions.push(moment(set[i]).format('YYYY-MM-DD'));
    }
  }
  return str_exclusions;
};

WeekDayCalc.calculateWeekdays = function (that, inArgs, useIsoWeekday) {
  let exclusions;
  let inclusions;
  let rangeEnd;
  let rangeStart;
  let weekdays;
  useIsoWeekday = useIsoWeekday ? true : false;
  switch (inArgs.length) {
  case 5:
    exclusions = inArgs[3];
    inclusions = inArgs[4];
  case 4:
    exclusions = inArgs[3];
    /* Fall-through to three args */
  case 3:
    rangeStart = moment(inArgs[0]).startOf('day');
    rangeEnd = moment(inArgs[1]).endOf('day');
    weekdays = inArgs[2];
    break;
  case 2:
    rangeStart = that;
    rangeEnd = inArgs[0];
    weekdays = inArgs[1];
    break;
  case 1:
    const arg = inArgs[0];
    if (arg && arg.rangeEnd && arg.weekdays) {
      rangeStart = arg.rangeStart
        ? moment(arg.rangeStart).startOf('day')
        : that;
      rangeEnd = moment(arg.rangeEnd).endOf('day');
      weekdays = arg.weekdays;
      exclusions = arg.exclusions;
      inclusions = arg.inclusions;
    }
    else {
      rangeStart = that.clone().startOf('year');
      rangeEnd = that.clone().endOf('year');
      weekdays = arg;
    }
    break;
  default:
    new WeekDayCalcException(
      'unexpected arguments length ' +
          inArgs.length +
          '. Expecting 1 to 4 args'
    );
  }
  if (rangeStart.isAfter(rangeEnd)) {
    const trueEnd = rangeStart.clone();
    rangeStart = rangeEnd.clone();
    rangeEnd = trueEnd;
  }

  const calc = new WeekDayCalc(
    rangeStart,
    rangeEnd,
    weekdays,
    exclusions,
    inclusions,
    useIsoWeekday
  );
  return calc.calculate();
};

DaysSetConverter.calculateDate = function (that, inArgs, useIsoWeekday) {
  let days;
  let exclusions;
  let inclusions;
  let weekdaysSet;
  useIsoWeekday = useIsoWeekday ? true : false;
  const rangeStart = that;
  switch (inArgs.length) {
  case 4:
    exclusions = inArgs[2];
    inclusions = inArgs[3];
  case 3:
    exclusions = inArgs[2];
    /* Fall-through to two args*/
  case 2:
    days = inArgs[0];
    weekdaysSet = inArgs[1];
    break;
  case 1:
    const arg = inArgs[0];
    if (arg && (arg.days !== undefined || arg.workdays !== undefined)) {
      if (arg.days !== undefined && arg.workdays !== undefined) {
        throw new DaysSetConverterException(
          'days and weekdays args should not be used together, because weekdays is an alias of days'
        );
      }
      days = arg.days ? arg.days : arg.workdays;
      weekdaysSet = arg.weekdays ? arg.weekdays : [1, 2, 3, 4, 5];
      exclusions = arg.exclusions;
      inclusions = arg.inclusions;
    }
    else {
      days = arg;
    }
    break;
  default:
    new DaysSetConverterException(
      'unexpected arguments length ' +
          inArgs.length +
          '. Expecting 1 to 3 args'
    );
  }
  const calc = new DaysSetConverter(
    that,
    weekdaysSet,
    exclusions,
    inclusions,
    useIsoWeekday
  );
  return calc.calculate(days);
};
//
// /**
//  * Calculate weekdays with locale aware weekdays
//  */
//>>>>>>>>>
moment.fn.weekdayCalc = function () {
  return WeekDayCalc.calculateWeekdays(this, arguments);
};
//<<<<<<<<
// /**
//  * Calculate weekdays with moment#isoWeekdays function, where 1 is always monday and 7 is always Sunday
//  */
moment.fn.isoWeekdayCalc = function () {
  return WeekDayCalc.calculateWeekdays(this, arguments, true);
};

/**
 * Calculates the date of {workdays} from now excluding today
 * For example 4 workdays from Wed 19 Aug 2015 is a Tue 25 Aug 2015
 * workdays set is Mon-Fri, please use addSetWeekdays if you have a different set
 */
moment.fn.addWorkdays = function (days, exclusions, inclusions) {
  return DaysSetConverter.calculateDate(this, [
    days,
    [1, 2, 3, 4, 5],
    exclusions,
    inclusions
  ]);
};

/**
 * Calculates how many calendar days within {workdays}
 * For example 4 workdays from Wed 19 Aug 2015 is 6 calendar days
 * workdays set is Mon-Fri, please use setWeekdaysToCalendarDays if you have a different set
 */
moment.fn.workdaysToCalendarDays = function (days, exclusions, inclusions) {
  const date = DaysSetConverter.calculateDate(this, [
    days,
    [1, 2, 3, 4, 5],
    exclusions,
    inclusions
  ]);
  return date.diff(this, 'days');
};

moment.fn.addWeekdaysFromSet = function () {
  return DaysSetConverter.calculateDate(this, arguments);
};

moment.fn.weekdaysFromSetToCalendarDays = function () {
  const date = DaysSetConverter.calculateDate(this, arguments);
  return date.diff(this, 'days');
};

moment.fn.isoAddWeekdaysFromSet = function () {
  return DaysSetConverter.calculateDate(this, arguments, true);
};

moment.fn.isoWeekdaysFromSetToCalendarDays = function () {
  const date = DaysSetConverter.calculateDate(this, arguments, true);
  return date.diff(this, 'days');
};
