'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('worker', (table) => {
    table.increments('id').primary();
    // table.string('shortName').notNullable();
    // table.json('displayName').notNullable();
    // table.decimal('price', 12, 0).notNullable();
    // table.text('description');
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
