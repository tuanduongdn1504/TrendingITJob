'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('tagProject')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('tagProject').insert([
        {
          projectId: 1,
          tagId: 1
        },
        {
          projectId: 1,
          tagId: 2
        },
        {
          projectId: 2,
          tagId: 3
        },
        {
          projectId: 2,
          tagId: 1
        },
        {
          projectId: 3,
          tagId: 1
        },
        {
          projectId: 2,
          tagId: 2
        }
      ]);
    });
};
