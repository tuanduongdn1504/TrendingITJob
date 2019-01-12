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
              email: 'product1@gmail.com',
              username: 'tuanproduct',
              password: bcrypt.hashSync('product123', 5),
              name: 'Duong Van product',
              roleId: 2
            },
            {
              id: 7,
              email: 'product2@gmail.com',
              username: 'vietproduct',
              password: bcrypt.hashSync('product123', 5),
              name: 'Phan Quoc product',
              roleId: 2
            },
            {
              id: 8,
              email: 'product3@gmail.com',
              username: 'conflictproduct',
              password: bcrypt.hashSync('product123', 5),
              name: 'Conflict product',
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
          },
          {
            isActive: true,
            userId: users[1]
          },
          {
            isActive: true,
            userId: users[2]
          }
        ])
      )
  );
};
