'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/projects',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/projects/{id}',
    config: handler.getOne
  },
  {
    method: 'POST',
    path: '/api/v1/projects',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/projects/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/projects/{id}',
    config: handler.deleteOne
  }
];

module.exports = Routes;
