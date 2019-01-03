'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('tagCv', (table) => {
    table.increments('id').primary();
    table.integer('cvId');
    table
      .foreign('cvId')
      .references('cv.id')
      .onDelete('CASCADE');
    table.integer('tagId');
    table
      .foreign('tagId')
      .references('tag.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.raw('DROP TABLE booking CASCADE');
};
