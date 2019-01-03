'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/posts',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/posts/{id}',
    config: handler.getOne
  },
  {
    method: 'POST',
    path: '/api/v1/posts',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/posts/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/posts/{id}',
    config: handler.deleteOne
  }
];

module.exports = Routes;
