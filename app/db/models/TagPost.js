'use strict';

const path = require('path');
const CustomModel = require('./CustomModel');

class TagPost extends CustomModel {
  static get tableName() {
    return 'tagPost';
  }

  static get relationMappings() {
    return {
      posts: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Post'),
        join: {
          from: 'tagPost.postId',
          to: 'post.id'
        }
      },
      tags: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Tag'),
        join: {
          from: 'tagPost.tagId',
          to: 'tag.id'
        }
      }
    };
  }
}

module.exports = TagPost;
