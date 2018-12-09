'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.string('resetPasswordToken');
    table.timestamp('resetPasswordExpire');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.string('resetPasswordToken');
    table.timestamp('resetPasswordExpire');
  });
};
