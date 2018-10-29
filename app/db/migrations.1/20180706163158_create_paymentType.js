'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('paymentType', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.jsonb('displayName');
    table.string('transactionType');
    table.boolean('isActive').defaultTo(true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('paymentType');
};
