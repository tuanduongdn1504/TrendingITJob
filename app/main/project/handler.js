'use strict';

const controller = require('./controller');
const validator = require('./validator');

exports.getMany = {
  description: 'Get Project list',
  notes: 'Return Project items',
  tags: ['api', 'v1'],
  handler: controller.getMany,
  auth: false,
  validate: {
    headers: validator.checkToken,
    query: validator.queryParams
  }
};

exports.getOne = {
  description: 'Get a Project',
  notes: 'Return a Project by id',
  tags: ['api', 'v1'],
  handler: controller.getOne,
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'productOwner', 'company', 'worker']
  },
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    }
  }
};

exports.createOne = {
  description: 'Create a new Project',
  notes: 'Return created Project',
  tags: ['api', 'v1'],
  handler: controller.createOne,
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'productOwner', 'company', 'worker']
  },
  validate: {
    headers: validator.checkToken,
    payload: validator.createProject
  }
};

exports.updateOne = {
  description: 'Update Project',
  notes: 'Return updated Project by id',
  tags: ['api', 'v1'],
  handler: controller.updateOne,
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'productOwner', 'company', 'worker']
  },
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    },
    payload: validator.updateProject
  }
};

exports.deleteOne = {
  description: 'Delete a Project',
  notes: 'Return deleted Project by id',
  tags: ['api', 'v1'],
  handler: controller.deleteOne,
  auth: {
    strategy: 'jwt',
    scope: ['admin']
  },
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    }
  }
};
