'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/tagCvs',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/tagCvs/{id}',
    config: handler.getOne
  },
  {
    method: 'POST',
    path: '/api/v1/tagCvs',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/tagCvs/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/tagCvs/{id}',
    config: handler.deleteOne
  }
];

module.exports = Routes;
