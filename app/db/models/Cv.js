'use strict';

const path = require('path');
const CustomModel = require('./CustomModel');

class Cv extends CustomModel {
  static get tableName() {
    return 'cv';
  }

  static get relationMappings() {
    return {
      workers: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Worker'),
        join: {
          from: 'cv.workerId',
          to: 'worker.id'
        }
      },
      tagCvs: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/TagCv'),
        join: {
          from: 'cv.id',
          to: 'tagCv.cvId'
        }
      }
    };
  }
}

module.exports = Cv;
