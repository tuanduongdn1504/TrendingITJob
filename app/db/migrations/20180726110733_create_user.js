'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('avatar');
    table.date('birthday');
    table.string('username', 191).unique();
    table
      .string('email', 191)
      .notNullable()
      .unique();
    table.string('password');
    table.integer('roleId');
    table
      .foreign('roleId')
      .references('role.id')
      .onDelete('CASCADE');
    table.string('nationality');
    table.string('job');
    table.string('facebook');
    table.text('comment');
    table.text('phoneNumber');
    table.string('twitter');
    table.string('linkedin');
    table.boolean('isActive').defaultTo(true);
    table.timestamp('createdAt');
    table.timestamp('updatedAt');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
