'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('businessinfo', (table) => {
    table.increments('id').primary();
    table.string('email');
    table.string('website');
    table.string('mobile');
    table.string('cellPhone');
    table.json('address');
    table.json('aboutApp');
    table.json('social');
    table.json('appLink');
    table.json('coordinate');
    table.json('openDayOfWeek');
    table.json('openTime');
    table.json('closeTime');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.raw('DROP TABLE businessinfo CASCADE');
};
