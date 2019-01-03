'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('tagPost')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('tagPost').insert([
        {
          postId: 1,
          tagId: 1
        },
        {
          postId: 1,
          tagId: 2
        },
        {
          postId: 1,
          tagId: 3
        }
      ]);
    });
};
