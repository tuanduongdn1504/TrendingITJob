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
