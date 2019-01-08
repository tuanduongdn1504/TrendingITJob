'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('project')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('project').insert([
        {
          title: 'iOS Developer (Objective C/Swift)',
          salary: 1500,
          location: 'Dong Da , Tan Binh, Ho Chi Minh',
          description: 'Top 3 Reasons To Join Us',
          productOwnerId: 1
        }
      ]);
    });
};
