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

exports.createPost = {
  title: Joi.string().required(),
  image: Joi.string(),
  personNeeded: Joi.number().required(),
  location: Joi.string(),
  salary: Joi.number(),
  description: Joi.string().allow(null),
  companyId: Joi.number().required()
};

exports.updatePost = {
  title: Joi.string(),
  image: Joi.string(),
  personNeeded: Joi.number(),
  location: Joi.string(),
  salary: Joi.number(),
  description: Joi.string().allow(null),
  companyId: Joi.number()
};
