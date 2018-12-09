'use strict';

const controller = require('./controller');
const validator = require('./validator');

exports.login = {
  description: 'Login to an account',
  notes: 'Return user and token',
  tags: ['api', 'v1'],
  handler: controller.login,
  auth: false,
  validate: {
    payload: validator.validateLogin
  }
};

exports.register = {
  description: 'Register an account to system',
  notes: 'Return user and token',
  tags: ['api', 'v1'],
  handler: controller.register,
  auth: false,
  validate: {
    payload: validator.validateRegister
  }
};

exports.facebook = {
  description: 'Login with facebook',
  notes: 'Return user and token',
  tags: ['api', 'v1'],
  handler: controller.facebook,
  auth: false,
  validate: validator.validateFacebook
};

exports.forgotPassword = {
  description: 'Forgot password api',
  notes: 'Forgot pasword and send email to reset password',
  tags: ['api', 'v1'],
  handler: controller.forgotPassword,
  auth: false,
  validate: {
    payload: validator.forgotPassword
  }
};

exports.resetPassword = {
  description: 'reset password api',
  notes: 'Reset pasword of an user to new one',
  tags: ['api', 'v1'],
  handler: controller.resetPassword,
  auth: false,
  validate: {
    payload: validator.resetPassword
  }
};
