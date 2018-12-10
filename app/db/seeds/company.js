'use strict';

const bcrypt = require('bcrypt');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return (
    knex('company')
      .del()
      // .then(() => knex('users').del())
      .then(() => {
        // Inserts seed entries
        return knex('users')
          .insert([
            {
              id: 3,
              email: 'company@gmail.com',
              username: 'tuancompany',
              password: bcrypt.hashSync('company123', 5),
              name: 'Duong Van company',
              roleId: 3
            }
          ])
          .returning('id');
      })
      .then((users) =>
        knex('company').insert([
          {
            isActive: true,
            userId: users[0]
          }
        ])
      )
  );
};
