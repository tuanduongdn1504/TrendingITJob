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
  name: Joi.string().required(),
  level: Joi.string(),
  image: Joi.string(),
  rating: Joi.number(),
  location: Joi.string(),
  isActive: Joi.boolean(),
  userId: Joi.number().required()
};

exports.updateWorker = {
  name: Joi.string(),
  level: Joi.string(),
  image: Joi.string(),
  rating: Joi.number(),
  location: Joi.string(),
  isActive: Joi.boolean(),
  userId: Joi.number()
};
