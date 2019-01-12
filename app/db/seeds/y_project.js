'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('project')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('project').insert([
        {
          nameProject: 'DanaQueue (React-Native/ReactJs/NodeJs/Firebase)',
          image:
            'https://cdn.itviec.com/photos/32631/processed_headline_photo/enouvo-headline_photo.jpg?SCQJMLCnrby1Dd5ioiRwXJsC',
          personNeeded: 4,
          location: '15 Tạ Mỹ Duật, An Hải Bắc, Sơn Trà, Đà Nẵng',
          owner: 'Duong Van product',
          productOwnerId: 1
        },
        {
          nameProject: 'RecommendJob (AngularJs)',
          image:
            'https://cdn.itviec.com/photos/32631/processed_headline_photo/enouvo-headline_photo.jpg?SCQJMLCnrby1Dd5ioiRwXJsC',
          personNeeded: 4,
          location: 'Le Van Sy, Tan Binh, Ho Chi Minh',
          owner: 'Phan Quoc product',
          productOwnerId: 2
        },
        {
          nameProject: 'DanaQueue (React-Native/ReactJs/NodeJs/Firebase)',
          image:
            'https://cdn.itviec.com/photos/32631/processed_headline_photo/enouvo-headline_photo.jpg?SCQJMLCnrby1Dd5ioiRwXJsC',
          personNeeded: 4,
          location: '15 Tạ Mỹ Duật, An Hải Bắc, Sơn Trà, Đà Nẵng',
          owner: 'Conflict product',
          productOwnerId: 3
        }
      ]);
    });
};
