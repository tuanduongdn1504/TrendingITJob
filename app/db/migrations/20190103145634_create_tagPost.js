'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('tagPost', (table) => {
    table.increments('id').primary();
    table.integer('postId');
    table
      .foreign('postId')
      .references('post.id')
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
