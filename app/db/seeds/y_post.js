'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('post')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('post').insert([
        {
          image:
            'https://cdn.itviec.com/photos/32631/processed_headline_photo/enouvo-headline_photo.jpg?SCQJMLCnrby1Dd5ioiRwXJsC',
          personNeeded: 5,
          title: 'Senior Mobile Dev (iOS/Android/React)',
          salary: 2000,
          location: '15 Tạ Mỹ Duật, An Hải Bắc, Sơn Trà, Đà Nẵng',
          description: 'Together we make a different',
          companyId: 1
        },
        {
          image:
            'https://cdn.itviec.com/photos/32631/processed_headline_photo/enouvo-headline_photo.jpg?SCQJMLCnrby1Dd5ioiRwXJsC',
          personNeeded: 5,
          title: 'Senior AngularJS ',
          salary: 1500,
          location: 'Le Van Sy, Tan Binh, Ho Chi Minh',
          description: 'Why You\'ll Love Working Here',
          companyId: 2
        },
        {
          image:
            'https://cdn.itviec.com/photos/32631/processed_headline_photo/enouvo-headline_photo.jpg?SCQJMLCnrby1Dd5ioiRwXJsC',
          personNeeded: 5,
          title: 'Senior Mobile Dev (iOS/Android/React)',
          salary: 1000,
          location: 'Le Van Sy, Tan Binh, Ho Chi Minh',
          description: 'Why You\'ll Love Working Here',
          companyId: 3
        }
      ]);
    });
};
