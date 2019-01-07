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

exports.createCompany = {
  name: Joi.string().required(),
  image: Joi.string(),
  numberOfJob: Joi.number().required(),
  location: Joi.string(),
  isActive: Joi.boolean(),
  userId: Joi.number().required()
};

exports.updateCompany = {
  name: Joi.string(),
  image: Joi.string(),
  numberOfJob: Joi.number(),
  location: Joi.string(),
  isActive: Joi.boolean(),
  userId: Joi.number()
};
