'use strict';

const Boom = require('boom');
const moment = require('moment');
const Models = require('../../db/models');
const bcrypt = require('bcrypt');
const { ROLES, ROLENAMES } = require('../../constants/roles');

exports.getSummary = async () => {
  const result = await Promise.all([
    getTotalActiveWorker(),
    getTotalWorked(),
    getTotalWorkedByTime('day'),
    getTotalWorkedByTime('month'),
    getTotalWorkedByTime('year')
  ]);
  return {
    numberOfTotalActiveWorker: result[0],
    numberOfTotalWorkedWorker: result[1],
    numberOfTotalWorkedByDay: result[2],
    numberOfTotalWorkedByMonth: result[3],
    numberOfTotalWorkedByYear: result[4]
  };
};

exports.getWorkerBooking = async (userId, query) => {
  return Models.Booking.queryBuilder(query).where({
    userId
  });
};

exports.getAllWorker = async (query) => {
  return Models.Worker.queryBuilder(query);
};

exports.getOneWorker = async (id) => {
  const result = await Models.Worker.query().findById(id);
  // .eager('users');
  if (!result) {
    throw Boom.notFound('Worker not found');
  }

  return result;
};

exports.createWorker = async (body) => {
  body.isActive = true;
  return Models.Worker.query().insert(body);
};
// exports.createService = async (body) => {
//   const servicePackage = await Models.ServicePackage.query().findById(
//     body.packageId
//   );
//   body.package = servicePackage;
//   if (!body.totalAmount) {
//     body.totalAmount = servicePackage.price * body.quantity;
//   }
//   const result = await Models.Service.query()
//     .insert(body)
//     .returning('*');
//   if (body.isPaid) {
//     await Models.Payment.query().insert({
//       amount: body.totalAmount,
//       description: `Pay for service id#${result.id}`,
//       paymentTypeId: servicePackage.paymentTypeId,
//       transactionType: 'INCOME',
//       bookingId: body.bookingId
//     });
//   }
//   return result;
// };

exports.activeWorker = async (id, body) => {
  try {
    const updatePayload = { isActive: true };
    const result = await Models.Worker.query().patchAndFetchById(
      id,
      updatePayload
    );
    return result;
  } catch (err) {
    throw err;
  }
};
exports.inactiveWorker = async (id, body) => {
  try {
    const updatePayload = { isActive: false };
    const result = await Models.Worker.query().patchAndFetchById(
      id,
      updatePayload
    );
    return result;
  } catch (err) {
    throw err;
  }
};

exports.updateWorker = async (id, body) => {
  try {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 5);
    }
    const result = await Models.Worker.query()
      .update(body)
      .where('id', id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('Worker not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteWorker = async (id) => {
  try {
    const result = await Models.Worker.query()
      .deleteById(id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('Worker not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteWorker = async (id) => {
  try {
    return Models.Worker.query()
      .deleteById(id)
      .returning('*');
  } catch (err) {
    throw err;
  }
};

async function getTotalActiveWorker() {
  const result = await await Models.Worker.query().count('isActive');
  return result[0].count;
}

async function getTotalWorked() {
  const result = await await Models.Booking.query()
    .countDistinct('userId')
    .whereIn('status', ['PENDING', 'INPROGRESS']);
  return result[0].count;
}

async function getTotalWorkedByTime(time) {
  const result = await await Models.Booking.query()
    .countDistinct('userId')
    .whereBetween('startTime', [
      moment
        .utc()
        .startOf(time)
        .toISOString(),
      moment
        .utc()
        .endOf(time)
        .toISOString()
    ])
    .whereNot('status', 'CANCELLED');
  return result[0].count;
}
