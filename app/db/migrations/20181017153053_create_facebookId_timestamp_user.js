'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.string('facebookId');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('facebookId');
    table.dropColumn('createdAt');
    table.dropColumn('updatedAt');
  });
};
