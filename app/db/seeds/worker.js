'use strict';

const bcrypt = require('bcrypt');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return (
    knex('worker')
      .del()
      // .then(() => knex('users').del())
      .then(() => {
        // Inserts seed entries
        return knex('users')
          .insert([
            {
              id: 4,
              email: 'tuan@gmail.com',
              username: 'tuanbear',
              password: bcrypt.hashSync('worker123', 5),
              name: 'Duong Van Bear',
              roleId: 4
            }
          ])
          .returning('id');
      })
      .then((users) =>
        knex('worker').insert([
          {
            isActive: true,
            userId: users[0]
          }
        ])
      )
  );
};
