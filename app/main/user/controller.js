'use strict';

const service = require('./service');

exports.getMany = async (request) => {
  try {
    return await service.getAllUser(request.query);
  } catch (err) {
    throw err;
  }
};

exports.getOne = async (request) => {
  try {
    const { id } = request.params;
    return await service.getOneUser(id);
  } catch (err) {
    throw err;
  }
};

exports.getCodeResetPassword = async (request) => {
  try {
    const { id } = request.params;
    return await service.getCodeResetPassword(id);
  } catch (err) {
    throw err;
  }
};

exports.updatePassword = async (request) => {
  try {
    const { id } = request.params;
    const { payload } = request;
    return await service.updatePassword(id, payload);
  } catch (err) {
    throw err;
  }
};

exports.createOne = async (request) => {
  try {
    const { payload } = request;
    return await service.createUser(payload);
  } catch (err) {
    throw err;
  }
};

exports.updateOne = async (request) => {
  try {
    const { params, payload } = request;
    const { id } = params;
    return await service.updateUser(id, payload);
  } catch (err) {
    throw err;
  }
};

exports.deleteOne = async (request) => {
  try {
    const { id } = request.params;
    return await service.deleteUser(id);
  } catch (err) {
    throw err;
  }
};
