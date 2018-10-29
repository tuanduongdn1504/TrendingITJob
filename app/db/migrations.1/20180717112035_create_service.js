'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('service', (table) => {
    table.increments('id').primary();
    table.integer('bookingId');
    table
      .foreign('bookingId')
      .references('booking.id')
      .onDelete('CASCADE');
    table.integer('packageId');
    table
      .foreign('packageId')
      .references('servicepackage.id')
      .onDelete('CASCADE');
    table.jsonb('package');
    table.integer('quanity').notNullable();
    table.boolean('isPaid').defaultTo(false);
    table.decimal('totalAmount', 12, 0).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.index(['createdAt']);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('service');
};
