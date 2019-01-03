'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('post')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('post').insert([
        {
          title: 'Senior Mobile Dev (iOS/Android/React)',
          salary: 2000,
          address: 'Le Van Sy, Tan Binh, Ho Chi Minh',
          description: 'Why You\'ll Love Working Here',
          companyId: 1
        }
      ]);
    });
};
