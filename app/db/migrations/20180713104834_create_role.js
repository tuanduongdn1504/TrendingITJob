'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('role', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.raw('DROP TABLE role CASCADE');
};
