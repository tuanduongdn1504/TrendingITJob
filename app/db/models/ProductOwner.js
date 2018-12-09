'use strict';

const path = require('path');
const CustomModel = require('./CustomModel');

class ProductOwner extends CustomModel {
  static get tableName() {
    return 'productOwner';
  }

  static get relationMappings() {
    return {
      users: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/User'),
        join: {
          from: 'productOwner.userId',
          to: 'users.id'
        }
      },
      project: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/Project'),
        join: {
          from: 'productOwner.id',
          to: 'project.productOwnerId'
        }
      }
    };
  }
}

module.exports = ProductOwner;
