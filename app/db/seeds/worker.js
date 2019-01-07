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
            // name: 'Duong Van Tuan',
            image:
              'https://cdn.itviec.com/photos/32631/processed_headline_photo/enouvo-headline_photo.jpg?SCQJMLCnrby1Dd5ioiRwXJsC',
            rating: 5,
            location: '15 Tạ Mỹ Duật, An Hải Bắc, Sơn Trà, Đà Nẵng',
            level: 'junior',
            isActive: true,
            userId: users[0]
          }
        ])
      )
  );
};
