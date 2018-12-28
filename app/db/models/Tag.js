'use strict';

const path = require('path');
const CustomModel = require('./CustomModel');

class Tag extends CustomModel {
  static get tableName() {
    return 'tag';
  }

  static get relationMappings() {
    return {
      posts: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/Post'),
        join: {
          from: 'tag.id',
          to: 'post.tagId'
        }
      },
      projects: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/Project'),
        join: {
          from: 'tag.id',
          to: 'project.tagId'
        }
      },
      cvs: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/Cv'),
        join: {
          from: 'tag.id',
          to: 'cv.tagId'
        }
      }
    };
  }
}

module.exports = Tag;
