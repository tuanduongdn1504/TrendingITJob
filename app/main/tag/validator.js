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

exports.createTag = {
  shortName: Joi.string().required(),
  description: Joi.string(),
  displayName: Joi.string().required()
  // isActive: Joi.boolean(),
};

exports.updateTag = {
  shortName: Joi.string(),
  description: Joi.string(),
  displayName: Joi.string()
  // isActive: Joi.boolean(),
};
