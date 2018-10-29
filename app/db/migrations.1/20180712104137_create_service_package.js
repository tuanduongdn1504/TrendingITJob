'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('servicepackage', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.json('displayName').notNullable();
    table.string('unit').notNullable();
    table.decimal('price', 12, 0).notNullable();
    table.boolean('isActive').defaultTo(true);
    table.integer('paymentTypeId');
    table
      .foreign('paymentTypeId')
      .references('paymentType.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.raw('DROP TABLE IF EXISTS servicepackage CASCADE');
};
