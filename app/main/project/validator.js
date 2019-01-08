'use strict';

const Joi = require('joi');
const {
  idNumber,
  objectLocalization,
  queryParams,
  checkToken
} = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.checkToken = checkToken;

exports.idParam = idNumber()
  .required()
  .description('id is required');

exports.createProject = {
  title: Joi.string(),
  location: Joi.string(),
  salary: Joi.number(),
  description: Joi.string().allow(null),
  productOwnerId: Joi.number()
};

exports.updateProject = {
  title: Joi.string(),
  location: Joi.string(),
  salary: Joi.number(),
  description: Joi.string().allow(null),
  productOwnerId: Joi.number()
};
