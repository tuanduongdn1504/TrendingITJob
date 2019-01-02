'use strict';

const controller = require('./controller');
const validator = require('./validator');

exports.getMany = {
  description: 'Get Cv list',
  notes: 'Return Cv items',
  tags: ['api', 'v1'],
  handler: controller.getMany,
  auth: false,
  validate: {
    headers: validator.checkToken,
    query: validator.queryParams
  }
};

exports.getOne = {
  description: 'Get a Cv',
  notes: 'Return a Cv by id',
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
  description: 'Create a new Cv',
  notes: 'Return created Cv',
  tags: ['api', 'v1'],
  handler: controller.createOne,
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'productOwner', 'company', 'worker']
  },
  validate: {
    headers: validator.checkToken,
    payload: validator.createCv
  }
};

exports.updateOne = {
  description: 'Update Cv',
  notes: 'Return updated Cv by id',
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
    payload: validator.updateCv
  }
};

exports.deleteOne = {
  description: 'Delete a Cv',
  notes: 'Return deleted Cv by id',
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
