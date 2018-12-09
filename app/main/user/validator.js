'use strict';

const Joi = require('joi');
const {
  idNumber,
  queryParams,
  strUsername,
  strEmail,
  strPassword,
  checkToken
} = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.checkToken = checkToken;

exports.idParam = idNumber()
  .required()
  .description('id is required');

exports.createUser = {
  name: Joi.string(),
  avatar: Joi.string(),
  username: strUsername().alphanum(),
  email: strEmail(),
  password: strPassword(),
  roleId: Joi.number().min(1),
  nationality: Joi.string(),
  job: Joi.string(),
  facebook: Joi.string(),
  comment: Joi.string(),
  phoneNumber: Joi.string(),
  gender: Joi.string().valid(['Male', 'Female']),
  linkedin: Joi.string().allow(null),
  twitter: Joi.string().allow(null)
};

exports.updateUser = {
  name: Joi.string(),
  avatar: Joi.string(),
  username: strUsername().alphanum(),
  email: strEmail(),
  password: strPassword(),
  roleId: Joi.number().min(1),
  nationality: Joi.string(),
  job: Joi.string(),
  facebook: Joi.string(),
  comment: Joi.string(),
  phoneNumber: Joi.string(),
  gender: Joi.string().valid(['Male', 'Female']),
  linkedin: Joi.string().allow(null),
  twitter: Joi.string().allow(null)
};
