'use strict';

const path = require('path');
const CustomModel = require('./CustomModel');

class TagCv extends CustomModel {
  static get tableName() {
    return 'tagCv';
  }

  static get relationMappings() {
    return {
      cvs: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Cv'),
        join: {
          from: 'tagCv.cvId',
          to: 'cv.id'
        }
      },
      tags: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Tag'),
        join: {
          from: 'tagCv.tagId',
          to: 'tag.id'
        }
      }
    };
  }
}

module.exports = TagCv;
