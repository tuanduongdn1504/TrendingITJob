'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: 'api/v1/users',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: 'api/v1/users/{id}',
    config: handler.getOne
  },
  {
    method: 'GET',
    path: 'api/v1/users/{id}/resetPassword',
    config: handler.resetPassword
  },
  {
    method: 'POST',
    path: 'api/v1/users/{id}/updatePassword',
    config: handler.updatePassword
  },
  {
    method: 'POST',
    path: 'api/v1/users',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: 'api/v1/users/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: 'api/v1/users/{id}',
    config: handler.deleteOne
  }
];

module.exports = Routes;
