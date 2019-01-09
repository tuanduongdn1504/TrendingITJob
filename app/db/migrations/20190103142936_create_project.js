'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('project', (table) => {
    table.increments('id').primary();
    table.string('nameProject');
    table.string('image');
    table.integer('personNeeded');
    table.string('location');
    table.text('owner');
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
