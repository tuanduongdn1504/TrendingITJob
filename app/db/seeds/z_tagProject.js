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
          projectId: 1,
          tagId: 3
        }
      ]);
    });
};
