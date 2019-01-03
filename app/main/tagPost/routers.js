'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/tagPosts',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/tagPosts/{id}',
    config: handler.getOne
  },
  {
    method: 'POST',
    path: '/api/v1/tagPosts',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/tagPosts/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/tagPosts/{id}',
    config: handler.deleteOne
  }
];

module.exports = Routes;
