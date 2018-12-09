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
            name: 'admin'
          },
          {
            name: 'productOwner'
          },
          {
            name: 'company'
          },
          {
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
