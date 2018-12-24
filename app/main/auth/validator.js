'use strict';

const Joi = require('joi');
const {
  strUsername,
  strEmail,
  strPassword
} = require('../../utils/validatorUtils');

exports.validateLogin = {
  username: strUsername(),
  email: strEmail().required(),
  password: strPassword().required()
};

exports.validateRegister = {
  name: Joi.string(),
  avatar: Joi.string(),
  username: strUsername(),
  email: strEmail().required(),
  password: strPassword().required(),
  roleId: Joi.number().required(),
  nationality: Joi.string(),
  job: Joi.string(),
  facebook: Joi.string(),
  comment: Joi.string(),
  phoneNumber: Joi.string()
};

exports.validateFacebook = {
  headers: Joi.object({
    access_token: Joi.string()
  }).options({ allowUnknown: true }),
  query: {
    access_token: Joi.string()
  },
  payload: {
    roleId: Joi.number().required()
  }
};

exports.forgotPassword = { email: strEmail().required() };

exports.resetPassword = {
  resetPasswordToken: Joi.string().required(),
  password: strPassword().required()
};
