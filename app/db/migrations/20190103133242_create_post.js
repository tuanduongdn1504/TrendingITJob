'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('post', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.decimal('salary', 12, 0).notNullable();
    table.text('address');
    table.text('description');
    table.integer('companyId');
    table
      .foreign('companyId')
      .references('company.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.raw('DROP TABLE booking CASCADE');
};
