'use strict';

const bcrypt = require('bcrypt');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => knex('role').del())
    .then(() => {
      return knex('role')
        .insert([
          {
            id: 1,
            name: 'admin'
          },
          {
            id: 2,
            name: 'productOwner'
          },
          {
            id: 3,
            name: 'company'
          },
          {
            id: 4,
            name: 'worker'
          }
        ])
        .returning('id');
    })
    .then((roles) =>
      knex('users').insert([
        {
          email: 'tuanduongdn1504@gmail.com',
          username: 'tuanduong',
          password: bcrypt.hashSync('admin123', 5),
          name: 'Duong Van Tuan',
          roleId: roles[0]
        }
      ])
    );
};
