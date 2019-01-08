'use strict';

const Boom = require('boom');
const Models = require('../../db/models');
const bcrypt = require('bcrypt');
const { ROLES, ROLENAMES } = require('../../constants/roles');

exports.getAllTagCv = async (query) => {
  return Models.TagCv.queryBuilder(query);
};

exports.getOneTagCv = async (id) => {
  const result = await Models.TagCv.query()
    .findById(id)
    .eager('[tags,cvs]');
  if (!result) {
    throw Boom.notFound('TagCv not found');
  }

  return result;
};

exports.createTagCv = async (body) => {
  return Models.TagCv.query().insert(body);
};

exports.updateTagCv = async (id, body) => {
  try {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 5);
    }
    const result = await Models.TagCv.query()
      .update(body)
      .where('id', id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('TagCv not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteTagCv = async (id) => {
  try {
    const result = await Models.TagCv.query()
      .deleteById(id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('TagCv not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteTagCv = async (id) => {
  try {
    return Models.TagCv.query()
      .deleteById(id)
      .returning('*');
  } catch (err) {
    throw err;
  }
};
