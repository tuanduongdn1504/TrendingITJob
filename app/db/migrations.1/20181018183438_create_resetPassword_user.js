'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.json('resetPassword');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('resetPassword');
  });
};
