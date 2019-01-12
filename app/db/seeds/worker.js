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
              email: 'tuan1@gmail.com',
              username: 'tuanbear1',
              password: bcrypt.hashSync('worker123', 5),
              name: 'Duong Van Bear1',
              roleId: 4
            },
            {
              id: 9,
              email: 'tuan2@gmail.com',
              username: 'tuanbear2',
              password: bcrypt.hashSync('worker123', 5),
              name: 'Duong Van Bear2',
              roleId: 4
            },
            {
              id: 10,
              email: 'tuan3@gmail.com',
              username: 'tuanbear3',
              password: bcrypt.hashSync('worker123', 5),
              name: 'Duong Van Bear3',
              roleId: 4
            }
          ])
          .returning('id');
      })
      .then((users) =>
        knex('worker').insert([
          {
            name: 'Duong Van Bear1',
            image:
              'https://cdn.itviec.com/photos/32631/processed_headline_photo/enouvo-headline_photo.jpg?SCQJMLCnrby1Dd5ioiRwXJsC',
            rating: 5,
            location: '15 Tạ Mỹ Duật, An Hải Bắc, Sơn Trà, Đà Nẵng',
            level: 'junior',
            isActive: true,
            userId: users[0]
          },
          {
            name: 'Duong Van Bear2',
            image:
              'https://cdn.itviec.com/photos/32631/processed_headline_photo/enouvo-headline_photo.jpg?SCQJMLCnrby1Dd5ioiRwXJsC',
            rating: 5,
            location: '15 Tạ Mỹ Duật, An Hải Bắc, Sơn Trà, Đà Nẵng',
            level: 'junior',
            isActive: true,
            userId: users[1]
          },
          {
            name: 'Duong Van Bear3',
            image:
              'https://cdn.itviec.com/photos/32631/processed_headline_photo/enouvo-headline_photo.jpg?SCQJMLCnrby1Dd5ioiRwXJsC',
            rating: 5,
            location: '15 Tạ Mỹ Duật, An Hải Bắc, Sơn Trà, Đà Nẵng',
            level: 'junior',
            isActive: true,
            userId: users[2]
          }
        ])
      )
  );
};
