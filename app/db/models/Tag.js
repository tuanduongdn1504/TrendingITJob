'use strict';

const path = require('path');
const CustomModel = require('./CustomModel');

class Tag extends CustomModel {
  static get tableName() {
    return 'tag';
  }

  static get relationMappings() {
    return {
      tagPosts: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/TagPost'),
        join: {
          from: 'tag.id',
          to: 'tagPost.tagId'
        }
      },
      tagProjects: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/TagProject'),
        join: {
          from: 'tag.id',
          to: 'tagProject.tagId'
        }
      },
      tagCvs: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/TagCv'),
        join: {
          from: 'tag.id',
          to: 'tagCv.tagId'
        }
      }
    };
  }
}

module.exports = Tag;
