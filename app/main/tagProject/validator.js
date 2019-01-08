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

exports.createTagProject = {
  projectId: Joi.number().required(),
  tagId: Joi.number().required()
};

exports.updateTagProject = {
  projectId: Joi.number(),
  tagId: Joi.number()
};
