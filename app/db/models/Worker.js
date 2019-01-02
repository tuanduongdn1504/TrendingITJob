'use strict';

const path = require('path');
const CustomModel = require('./CustomModel');

class Worker extends CustomModel {
  static get tableName() {
    return 'worker';
  }

  static get relationMappings() {
    return {
      users: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/User'),
        join: {
          from: 'worker.userId',
          to: 'users.id'
        }
      },
      cvs: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/Cv'),
        join: {
          from: 'worker.id',
          to: 'cv.workerId'
        }
      }
    };
  }
}

module.exports = Worker;
