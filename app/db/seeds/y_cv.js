'use strict';
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('cv')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('cv').insert([
        {
          nameWorker: 'Duong Van Bear1',
          description: 'React-native',
          workerId: 1
        },
        {
          nameWorker: 'Duong Van Bear2',
          description: 'React-native',
          workerId: 2
        },
        {
          nameWorker: 'Duong Van Bear3',
          description: 'React-native',
          workerId: 3
        }
      ]);
    });
};
