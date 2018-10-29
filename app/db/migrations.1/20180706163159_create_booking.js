'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('booking', (table) => {
    table.increments('id').primary();
    table.decimal('totalAmount', 12, 0);
    table.boolean('isPaid').defaultTo(false);
    table.boolean('isDealPrice').defaultTo(false);
    table.text('note');
    table.integer('numberOfCustomer');
    table.string('status');
    table.string('paymentMethod');
    table.integer('packageId');
    table
      .foreign('packageId')
      .references('package.id')
      .onDelete('CASCADE');
    table.integer('userId');
    table.integer('roomId');
    table.integer('packageTypeId');
    table.jsonb('package');
    table.timestamp('startTime');
    table.timestamp('expectedEndTime');
    table.timestamp('actualEndTime');
    table.timestamp('finishTime');
    table.string('customerName');
    table.string('email');
    table.string('packageType');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.decimal('discountValue', 12, 0);
    table.string('discountUnit');
    table.index(['startTime', 'status']);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.raw('DROP TABLE booking CASCADE');
};
