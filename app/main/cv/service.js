'use strict';

const Boom = require('boom');
const Models = require('../../db/models');
const bcrypt = require('bcrypt');
const { ROLES, ROLENAMES } = require('../../constants/roles');

exports.getAllCv = async (query) => {
  return Models.Cv.queryBuilder(query);
};

exports.getOneCv = async (id) => {
  const result = await Models.Cv.query()
    .findById(id)
    .eager('workers');
  if (!result) {
    throw Boom.notFound('Cv not found');
  }

  return result;
};

exports.createCv = async (body) => {
  return Models.Cv.query().insert(body);
};

exports.updateCv = async (id, body) => {
  try {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 5);
    }
    const result = await Models.Cv.query()
      .update(body)
      .where('id', id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('Cv not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteCv = async (id) => {
  try {
    const result = await Models.Cv.query()
      .deleteById(id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('Cv not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteCv = async (id) => {
  try {
    return Models.Cv.query()
      .deleteById(id)
      .returning('*');
  } catch (err) {
    throw err;
  }
};
