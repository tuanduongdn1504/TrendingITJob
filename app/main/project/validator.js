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
  nameProject: Joi.string().required(),
  image: Joi.string(),
  personNeeded: Joi.number(),
  location: Joi.string(),
  owner: Joi.string().allow(null),
  productOwnerId: Joi.number()
};

exports.updateProject = {
  nameProject: Joi.string(),
  image: Joi.string(),
  personNeeded: Joi.number(),
  location: Joi.string(),
  owner: Joi.string().allow(null),
  productOwnerId: Joi.number()
};
