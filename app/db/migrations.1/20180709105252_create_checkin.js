'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('checkin', (table) => {
    table.increments('id').primary();
    table.timestamp('startTime');
    table.timestamp('endTime');
    table.integer('bookingId');
    table
      .foreign('bookingId')
      .references('booking.id')
      .onDelete('CASCADE');
    table.index(['startTime']);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.raw('DROP TABLE checkin CASCADE');
};
