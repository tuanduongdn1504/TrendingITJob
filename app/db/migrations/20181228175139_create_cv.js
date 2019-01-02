'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('cv', (table) => {
    table.increments('id').primary();
    table.string('nameWorker');
    table.text('description');
    table.integer('workerId');
    table
      .foreign('workerId')
      .references('worker.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.raw('DROP TABLE booking CASCADE');
};
