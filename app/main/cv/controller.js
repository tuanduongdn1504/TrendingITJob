'use strict';

const service = require('./service');

exports.getMany = async (request) => {
  try {
    return await service.getAllCv(request.query);
  } catch (err) {
    throw err;
  }
};

exports.getOne = async (request) => {
  try {
    const { id } = request.params;
    return await service.getOneCv(id);
  } catch (err) {
    throw err;
  }
};

exports.createOne = async (request) => {
  try {
    const { payload } = request;
    return await service.createCv(payload);
  } catch (err) {
    throw err;
  }
};

exports.updateOne = async (request) => {
  try {
    const { params, payload } = request;
    const { id } = params;
    return await service.updateCv(id, payload);
  } catch (err) {
    throw err;
  }
};

exports.deleteOne = async (request) => {
  try {
    const { id } = request.params;
    return await service.deleteCv(id);
  } catch (err) {
    throw err;
  }
};
