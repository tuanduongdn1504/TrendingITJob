'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/cvs',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/cvs/{id}',
    config: handler.getOne
  },
  {
    method: 'POST',
    path: '/api/v1/cvs',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/cvs/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/cvs/{id}',
    config: handler.deleteOne
  }
];

module.exports = Routes;
