'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('tagProject', (table) => {
    table.increments('id').primary();
    table.integer('projectId');
    table
      .foreign('projectId')
      .references('project.id')
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
