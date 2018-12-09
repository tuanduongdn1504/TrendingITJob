'use strict';

const service = require('./service');

exports.login = async (request) => {
  try {
    const { payload } = request;
    return await service.login(payload);
  } catch (err) {
    throw err;
  }
};

exports.register = async (request) => {
  try {
    const { payload } = request;
    return await service.register(payload);
  } catch (err) {
    throw err;
  }
};

exports.facebook = async (request, response) => {
  try {
    return await service.facebook(request, response);
  } catch (err) {
    throw err;
  }
};

exports.forgotPassword = async (request) => {
  try {
    return await service.forgotPassword(request.payload.email);
  } catch (err) {
    throw err;
  }
};

exports.resetPassword = async (request) => {
  try {
    const { resetPasswordToken, password } = request.payload;
    return await service.resetPassword(resetPasswordToken, password);
  } catch (err) {
    throw err;
  }
};
