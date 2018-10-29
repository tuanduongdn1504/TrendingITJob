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
  name: Joi.string().required(),
  avatar: Joi.string(),
  username: strUsername().required(),
  email: strEmail().required(),
  password: strPassword().required(),
  roleId: Joi.number(),
  nationality: Joi.string(),
  job: Joi.string(),
  facebook: Joi.string(),
  howToKnowEnouvoSpace: Joi.string(),
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
