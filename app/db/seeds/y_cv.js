'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('cv')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('cv').insert([
        {
          nameWorker: 'Duong Van Bear',
          description: 'React-native',
          workerId: 1
        }
      ]);
    });
};
