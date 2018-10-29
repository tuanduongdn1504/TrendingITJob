'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('payment', (table) => {
    table.increments('id').primary();
    table.decimal('amount', 12, 0);
    table.string('description');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.integer('paymentTypeId');
    table
      .foreign('paymentTypeId')
      .references('paymentType.id')
      .onDelete('CASCADE');
    table.string('transactionType');
    table.jsonb('tags');
    table.index(['createdAt']);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.raw('DROP TABLE payment CASCADE');
};
