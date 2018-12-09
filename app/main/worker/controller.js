'use strict';

const service = require('./service');

exports.getMany = async (request) => {
  try {
    return await service.getAllWorker(request.query);
  } catch (err) {
    throw err;
  }
};

exports.getOne = async (request) => {
  try {
    const { id } = request.params;
    return await service.getOneWorker(id);
  } catch (err) {
    throw err;
  }
};

exports.createOne = async (request) => {
  try {
    const { payload } = request;
    return await service.createWorker(payload);
  } catch (err) {
    throw err;
  }
};

exports.updateOne = async (request) => {
  try {
    const { params, payload } = request;
    const { id } = params;
    return await service.updateWorker(id, payload);
  } catch (err) {
    throw err;
  }
};

exports.deleteOne = async (request) => {
  try {
    const { id } = request.params;
    return await service.deleteWorker(id);
  } catch (err) {
    throw err;
  }
};
