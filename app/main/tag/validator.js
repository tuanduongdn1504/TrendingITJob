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

exports.createProductOwner = {
  shortName: Joi.string().required(),
  description: Joi.string(),
  displayName: Joi.string().required()
  // isActive: Joi.boolean(),
};

exports.updateProductOwner = {
  shortName: Joi.string(),
  description: Joi.string(),
  displayName: Joi.string()
  // isActive: Joi.boolean(),
};
