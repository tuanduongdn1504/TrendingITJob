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
          location: 'Le Van Sy, Tan Binh, Ho Chi Minh',
          description: 'Why You\'ll Love Working Here',
          companyId: 1
        }
      ]);
    });
};
