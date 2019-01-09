'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('worker', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('image');
    table.integer('rating');
    table.string('location');
    table.string('level');
    table.boolean('isActive').defaultTo(true);
    table.integer('userId');
    table
      .foreign('userId')
      .references('users.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('worker');
};
