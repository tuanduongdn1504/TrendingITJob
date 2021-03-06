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

exports.createCv = {
  nameWorker: Joi.string().required(),
  description: Joi.string(),
  workerId: Joi.number().required()
};

exports.updateCv = {
  nameWorker: Joi.string(),
  description: Joi.string(),
  workerId: Joi.number()
};
