'use strict';

const path = require('path');
const CustomModel = require('./CustomModel');

class Project extends CustomModel {
  static get tableName() {
    return 'project';
  }

  static get relationMappings() {
    return {
      productOwners: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/ProductOwner'),
        join: {
          from: 'project.productOwnerId',
          to: 'productOwner.id'
        }
      },
      tagProjects: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, '/TagProject'),
        join: {
          from: 'project.id',
          to: 'tagProject.projectId'
        }
      }
    };
  }
}

module.exports = Project;
