'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('room', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.json('displayName').notNullable();
    table.json('capacity').notNullable();
    table.text('description');
    table.string('image');
    table.integer('order');
    table.boolean('isActive').defaultTo(true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('room');
};
