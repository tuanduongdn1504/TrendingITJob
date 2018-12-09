'use strict';

const controller = require('./controller');
const validator = require('./validator');

exports.getMany = {
  description: 'Get Worker list',
  notes: 'Return Worker items',
  tags: ['api', 'v1'],
  handler: controller.getMany,
  auth: false,
  validate: {
    headers: validator.checkToken,
    query: validator.queryParams
  }
};

exports.getOne = {
  description: 'Get a Worker',
  notes: 'Return a Worker by id',
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
  description: 'Create a new Worker',
  notes: 'Return created Worker',
  tags: ['api', 'v1'],
  handler: controller.createOne,
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'productOwner', 'company', 'worker']
  },
  validate: {
    headers: validator.checkToken,
    payload: validator.createWorker
  }
};

exports.updateOne = {
  description: 'Update Worker',
  notes: 'Return updated Worker by id',
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
    payload: validator.updateWorker
  }
};

exports.deleteOne = {
  description: 'Delete a Worker',
  notes: 'Return deleted Worker by id',
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
