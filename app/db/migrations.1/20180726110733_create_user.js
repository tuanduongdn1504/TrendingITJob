'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('avatar');
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
    table.string('howToKnowEnouvoSpace');
    table.text('comment');
    table.text('phoneNumber');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
