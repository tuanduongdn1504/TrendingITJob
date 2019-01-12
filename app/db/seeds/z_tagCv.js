'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('tagCv')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('tagCv').insert([
        {
          cvId: 1,
          tagId: 1
        },
        {
          cvId: 1,
          tagId: 2
        },
        {
          cvId: 2,
          tagId: 3
        },
        {
          cvId: 2,
          tagId: 1
        },
        {
          cvId: 3,
          tagId: 1
        },
        {
          cvId: 2,
          tagId: 2
        }
      ]);
    });
};
