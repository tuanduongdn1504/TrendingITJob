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

exports.createWorker = {
  shortName: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string(),
  displayName: objectLocalization().required(),
  price: Joi.number().required(),
  isActive: Joi.boolean(),
  isPayByQuantity: Joi.boolean(),
  isPayWhenCheckout: Joi.boolean(),
  isDefault: Joi.boolean(),
  isHour: Joi.boolean(),
  roomId: Joi.number().required(),
  workerTypeId: Joi.number().required()
};

exports.updateWorker = {
  shortName: Joi.string(),
  name: Joi.string(),
  description: Joi.string(),
  displayName: objectLocalization(),
  price: Joi.number(),
  isActive: Joi.boolean(),
  isPayByQuantity: Joi.boolean(),
  isPayWhenCheckout: Joi.boolean(),
  isDefault: Joi.boolean(),
  isHour: Joi.boolean(),
  roomId: Joi.number(),
  workerTypeId: Joi.number()
};
