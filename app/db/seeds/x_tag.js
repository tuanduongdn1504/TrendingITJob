'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('tag')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('tag').insert([
        {
          shortName: 'RN',
          displayName: 'React-native',
          description: 'Framework of FaceBook - open source'
        },
        {
          shortName: 'FLUTTER',
          displayName: 'Flutter',
          description: 'Framework of Google - open source'
        },
        {
          shortName: 'PHP',
          displayName: 'Personal Home Page',
          description: 'Scripting language - open source'
        }
      ]);
    });
};
