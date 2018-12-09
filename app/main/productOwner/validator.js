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
  // shortName: Joi.string().required(),
  // description: Joi.string(),
  // displayName: objectLocalization().required(),
  // price: Joi.number().required(),
  isActive: Joi.boolean(),
  userId: Joi.number().required()
};

exports.updateProductOwner = {
  // shortName: Joi.string(),
  // description: Joi.string(),
  // displayName: objectLocalization(),
  // price: Joi.number(),
  isActive: Joi.boolean(),
  userId: Joi.number()
};
