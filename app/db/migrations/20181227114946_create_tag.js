'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('tag', (table) => {
    table.increments('id').primary();
    table.string('shortName').notNullable();
    table.string('displayName').notNullable();
    table.text('description');
    // table.boolean('isActive').defaultTo(true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.raw('DROP TABLE booking CASCADE');
};
