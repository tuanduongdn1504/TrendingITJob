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
              name: 'Duong Van Tuan',
              roleId: 3
            },
            {
              id: 5,
              email: 'company1@gmail.com',
              username: 'vietcompany',
              password: bcrypt.hashSync('company123', 5),
              name: 'Phan Quoc Viet',
              roleId: 3
            },
            {
              id: 6,
              email: 'company2@gmail.com',
              username: 'conflictcompany',
              password: bcrypt.hashSync('company123', 5),
              name: 'Conflict',
              roleId: 3
            }
          ])
          .returning('id');
      })
      .then((users) =>
        knex('company').insert([
          {
            name: 'Enouvo IT Solution',
            image:
              'https://cdn.itviec.com/photos/32631/processed_headline_photo/enouvo-headline_photo.jpg?SCQJMLCnrby1Dd5ioiRwXJsC',
            numberOfJob: 1,
            location: '15 Tạ Mỹ Duật, An Hải Bắc, Sơn Trà, Đà Nẵng',
            isActive: true,
            userId: users[0]
          },
          {
            name: 'ABC',
            image:
              'https://cdn.itviec.com/photos/32631/processed_headline_photo/enouvo-headline_photo.jpg?SCQJMLCnrby1Dd5ioiRwXJsC',
            numberOfJob: 1,
            location: '15 Tạ Mỹ Duật, An Hải Bắc, Sơn Trà, Đà Nẵng',
            isActive: true,
            userId: users[1]
          },
          {
            name: 'Conflict',
            image:
              'https://cdn.itviec.com/photos/32631/processed_headline_photo/enouvo-headline_photo.jpg?SCQJMLCnrby1Dd5ioiRwXJsC',
            numberOfJob: 1,
            location: '15 Tạ Mỹ Duật, An Hải Bắc, Sơn Trà, Đà Nẵng',
            isActive: true,
            userId: users[2]
          }
        ])
      )
  );
};
