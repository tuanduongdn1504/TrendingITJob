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

exports.createTagCv = {
  cvId: Joi.number().required(),
  tagId: Joi.number().required()
};

exports.updateTagCv = {
  cvId: Joi.number(),
  tagId: Joi.number()
};
