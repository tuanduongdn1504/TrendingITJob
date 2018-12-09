'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/workers',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/workers/{id}',
    config: handler.getOne
  },
  {
    method: 'POST',
    path: '/api/v1/workers',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/workers/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/workers/{id}',
    config: handler.deleteOne
  }
];

module.exports = Routes;
