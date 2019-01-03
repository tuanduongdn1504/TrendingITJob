'use strict';

const controller = require('./controller');
const validator = require('./validator');

exports.getMany = {
  description: 'Get TagPost list',
  notes: 'Return TagPost items',
  tags: ['api', 'v1'],
  handler: controller.getMany,
  auth: false,
  validate: {
    headers: validator.checkToken,
    query: validator.queryParams
  }
};

exports.getOne = {
  description: 'Get a TagPost',
  notes: 'Return a TagPost by id',
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
  description: 'Create a new TagPost',
  notes: 'Return created TagPost',
  tags: ['api', 'v1'],
  handler: controller.createOne,
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'productOwner', 'company', 'worker']
  },
  validate: {
    headers: validator.checkToken,
    payload: validator.createTagPost
  }
};

exports.updateOne = {
  description: 'Update TagPost',
  notes: 'Return updated TagPost by id',
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
    payload: validator.updateTagPost
  }
};

exports.deleteOne = {
  description: 'Delete a TagPost',
  notes: 'Return deleted TagPost by id',
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
