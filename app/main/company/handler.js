'use strict';

const controller = require('./controller');
const validator = require('./validator');

exports.getMany = {
  description: 'Get Company list',
  notes: 'Return Company items',
  tags: ['api', 'v1'],
  handler: controller.getMany,
  auth: false,
  validate: {
    headers: validator.checkToken,
    query: validator.queryParams
  }
};

exports.getOne = {
  description: 'Get a Company',
  notes: 'Return a Company by id',
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
  description: 'Create a new Company',
  notes: 'Return created Company',
  tags: ['api', 'v1'],
  handler: controller.createOne,
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'productOwner', 'company', 'worker']
  },
  validate: {
    headers: validator.checkToken,
    payload: validator.createProductOwner
  }
};

exports.updateOne = {
  description: 'Update Company',
  notes: 'Return updated Company by id',
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
    payload: validator.updateCompany
  }
};

exports.deleteOne = {
  description: 'Delete a Company',
  notes: 'Return deleted Company by id',
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
