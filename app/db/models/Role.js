'use strict';

const path = require('path');
const CustomModel = require('./CustomModel');

class Role extends CustomModel {
  static get tableName() {
    return 'role';
  }

  static get relationMappings() {
    return {
      packages: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/User'),
        join: {
          from: 'role.id',
          to: 'users.roleId'
        }
      }
    };
  }
}

module.exports = Role;
