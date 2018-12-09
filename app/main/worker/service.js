'use strict';

const Boom = require('boom');
const Models = require('../../db/models');

exports.getAllWorker = async (query) => {
  return Models.Worker.queryBuilder(query);
};

exports.getOneWorker = async (id) => {
  const result = await Models.Worker.query().findById(id);
  if (!result) {
    throw Boom.notFound('Worker not found');
  }

  return result;
};

exports.createWorker = async (body) => {
  return Models.Worker.query().insert(body);
};

exports.updateWorker = async (id, body) => {
  try {
    const result = await Models.Worker.query()
      .update(body)
      .where('id', id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('Worker not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteWorker = async (id) => {
  try {
    const result = await Models.Worker.query()
      .deleteById(id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('Worker not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteWorker = async (id) => {
  try {
    return Models.Worker.query()
      .deleteById(id)
      .returning('*');
  } catch (err) {
    throw err;
  }
};
