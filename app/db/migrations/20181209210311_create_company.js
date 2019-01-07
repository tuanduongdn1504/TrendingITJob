'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('company', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('image');
    table.integer('numberOfJob');
    table.string('location');
    table.boolean('isActive').defaultTo(true);
    table.integer('userId');
    table
      .foreign('userId')
      .references('users.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('company');
};
