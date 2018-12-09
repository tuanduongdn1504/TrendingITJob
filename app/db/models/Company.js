'use strict';

const path = require('path');
const CustomModel = require('./CustomModel');

class Company extends CustomModel {
  static get tableName() {
    return 'company';
  }

  static get relationMappings() {
    return {
      users: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/User'),
        join: {
          from: 'company.userId',
          to: 'users.id'
        }
      },
      post: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/Post'),
        join: {
          from: 'company.id',
          to: 'post.companyId'
        }
      }
    };
  }
}

module.exports = Company;
