'use strict';

const path = require('path');
const CustomModel = require('./CustomModel');

class TagProject extends CustomModel {
  static get tableName() {
    return 'tagProject';
  }

  static get relationMappings() {
    return {
      projects: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Project'),
        join: {
          from: 'tagProject.projectId',
          to: 'project.id'
        }
      },
      tags: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Tag'),
        join: {
          from: 'tagProject.tagId',
          to: 'tag.id'
        }
      }
    };
  }
}

module.exports = TagProject;
