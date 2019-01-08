'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('project', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.decimal('salary', 12, 0);
    // .notNullable();
    table.text('location');
    table.text('description');
    table.integer('productOwnerId');
    table
      .foreign('productOwnerId')
      .references('productOwner.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.raw('DROP TABLE booking CASCADE');
};
