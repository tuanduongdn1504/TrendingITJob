'use strict';

const bcrypt = require('bcrypt');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return (
    knex('productOwner')
      .del()
      // .then(() => knex('users').del())
      .then(() => {
        // Inserts seed entries
        return knex('users')
          .insert([
            {
              id: 2,
              email: 'product@gmail.com',
              username: 'tuanproduct',
              password: bcrypt.hashSync('product123', 5),
              name: 'Duong Van product',
              roleId: 2
            }
          ])
          .returning('id');
      })
      .then((users) =>
        knex('productOwner').insert([
          {
            isActive: true,
            userId: users[0]
          }
        ])
      )
  );
};
