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
  nameWorker: Joi.string().required(),
  description: Joi.string(),
  workerId: Joi.number().required()
};

exports.updateProject = {
  nameWorker: Joi.string(),
  description: Joi.string(),
  workerId: Joi.number()
};
