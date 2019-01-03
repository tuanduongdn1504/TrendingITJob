'use strict';

const path = require('path');
const CustomModel = require('./CustomModel');

class Post extends CustomModel {
  static get tableName() {
    return 'post';
  }

  static get relationMappings() {
    return {
      companies: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Company'),
        join: {
          from: 'post.companyId',
          to: 'company.id'
        }
      },
      tagPosts: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/TagPost'),
        join: {
          from: 'post.id',
          to: 'tagPost.postId'
        }
      }
    };
  }
}

module.exports = Post;
