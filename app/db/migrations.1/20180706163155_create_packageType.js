'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('packageType', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.json('displayName').notNullable();
    table.boolean('isActive').defaultTo(true);
    table.integer('order');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('packageType');
};
