'use strict';

const controller = require('./controller');
const validator = require('./validator');

exports.getMany = {
  description: 'Get User list',
  notes: 'Return User items',
  tags: ['api', 'v1'],
  handler: controller.getMany,
  auth: {
    strategy: 'jwt',
    scope: ['admin']
  },
  validate: {
    headers: validator.checkToken,
    query: validator.queryParams
  }
};

exports.getOne = {
  description: 'Get a User',
  notes: 'Return a User by id',
  tags: ['api', 'v1'],
  handler: controller.getOne,
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'projectOwner', 'user', 'company']
  },
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    }
  }
};

exports.createOne = {
  description: 'Create a new User',
  notes: 'Return created User',
  tags: ['api', 'v1'],
  handler: controller.createOne,
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'projectOwner', 'user', 'company']
  },
  validate: {
    headers: validator.checkToken,
    payload: validator.createUser
  }
};

exports.updateOne = {
  description: 'Update User',
  notes: 'Return updated User by id',
  tags: ['api', 'v1'],
  handler: controller.updateOne,
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'projectOwner', 'user', 'company']
  },
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    },
    payload: validator.updateUser
  }
};

// exports.updatePassword = {
//   description: 'Create a new password',
//   notes: 'Return a user',
//   tags: ['api', 'v1'],
//   handler: controller.updatePassword,
//   auth: {
//     strategy: 'jwt',
//     scope: ['admin', 'projectOwner', 'user', 'company']
//   },
//   validate: {
//     headers: validator.checkToken,
//     params: {
//       id: validator.idParam
//     },
//     payload: validator.resetPassword
//   }
// };

exports.deleteOne = {
  description: 'Delete a User',
  notes: 'Return deleted User by id',
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
