'use strict';

const path = require('path');
const CustomModel = require('./CustomModel');

class User extends CustomModel {
  static get tableName() {
    return 'users';
  }
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
  static get $hidden() {
    return ['password', 'resetPassword'];
  }

  static get relationMappings() {
    return {
      role: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Role'),
        join: {
          from: 'users.roleId',
          to: 'role.id'
        }
      },
      companies: {
        relation: CustomModel.HasOneRelation,
        modelClass: path.join(__dirname, '/Company'),
        join: {
          from: 'users.id',
          to: 'company.userId'
        }
      },
      productOwners: {
        relation: CustomModel.HasOneRelation,
        modelClass: path.join(__dirname, '/ProductOwner'),
        join: {
          from: 'users.id',
          to: 'productOwner.userId'
        }
      },
      workers: {
        relation: CustomModel.HasOneRelation,
        modelClass: path.join(__dirname, '/Worker'),
        join: {
          from: 'users.id',
          to: 'worker.userId'
        }
      }
    };
  }
}

module.exports = User;
