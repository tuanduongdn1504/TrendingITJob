'use strict';

const Boom = require('boom');
const Models = require('../../db/models');
const bcrypt = require('bcrypt');

exports.getAllTag = async (query) => {
  return Models.Tag.queryBuilder(query);
};

exports.getOneTag = async (id) => {
  const result = await Models.Tag.query().findById(id);
  if (!result) {
    throw Boom.notFound('Tag not found');
  }

  return result;
};

exports.createTag = async (body) => {
  return Models.Tag.query().insert(body);
};

exports.updateTag = async (id, body) => {
  try {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 5);
    }
    const result = await Models.Tag.query()
      .update(body)
      .where('id', id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('Tag not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteTag = async (id) => {
  try {
    const result = await Models.Tag.query()
      .deleteById(id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('Tag not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteTag = async (id) => {
  try {
    return Models.Tag.query()
      .deleteById(id)
      .returning('*');
  } catch (err) {
    throw err;
  }
};
