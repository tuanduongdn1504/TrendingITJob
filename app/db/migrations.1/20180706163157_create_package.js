'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('package', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('shortName').notNullable();
    table.json('displayName').notNullable();
    table.decimal('price', 12, 0).notNullable();
    table.text('description');
    table.boolean('isPayByQuanity').defaultTo(true);
    table.boolean('isPayWhenCheckout').defaultTo(true);
    table.boolean('isDefault').defaultTo(false);
    table.boolean('isActive').defaultTo(true);
    table.boolean('isHour').defaultTo(true);
    table.integer('packageTypeId');
    table
      .foreign('packageTypeId')
      .references('packageType.id')
      .onDelete('CASCADE');
    table.integer('roomId');
    table
      .foreign('roomId')
      .references('room.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('package');
};
