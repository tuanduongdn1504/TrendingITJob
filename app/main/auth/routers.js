'use strict';

const handler = require('./handler');
const Routes = [
  {
    method: 'POST',
    path: '/api/v1/auth/login',
    config: handler.login
  },
  {
    method: 'POST',
    path: '/api/v1/auth/register',
    config: handler.register
  },
  {
    method: 'POST',
    path: '/api/v1/auth/facebook',
    config: handler.facebook
  },
  {
    method: 'POST',
    path: '/api/v1/auth/forgotPassword',
    config: handler.forgotPassword
  },
  {
    method: 'POST',
    path: '/api/v1/auth/resetPassword',
    config: handler.resetPassword
  }
];

module.exports = Routes;
