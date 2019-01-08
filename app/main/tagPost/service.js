'use strict';

const Boom = require('boom');
const Models = require('../../db/models');
const bcrypt = require('bcrypt');
const { ROLES, ROLENAMES } = require('../../constants/roles');

exports.getAllTagPost = async (query) => {
  return Models.TagPost.queryBuilder(query);
};

exports.getOneTagPost = async (id) => {
  const result = await Models.TagPost.query()
    .findById(id)
    .eager('[tags,posts]');
  if (!result) {
    throw Boom.notFound('TagPost not found');
  }

  return result;
};

exports.createTagPost = async (body) => {
  return Models.TagPost.query().insert(body);
};

exports.updateTagPost = async (id, body) => {
  try {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 5);
    }
    const result = await Models.TagPost.query()
      .update(body)
      .where('id', id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('TagPost not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteTagPost = async (id) => {
  try {
    const result = await Models.TagPost.query()
      .deleteById(id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('TagPost not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteTagPost = async (id) => {
  try {
    return Models.TagPost.query()
      .deleteById(id)
      .returning('*');
  } catch (err) {
    throw err;
  }
};
