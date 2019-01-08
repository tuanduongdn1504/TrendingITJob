'use strict';

const Boom = require('boom');
const Models = require('../../db/models');
const bcrypt = require('bcrypt');
const { ROLES, ROLENAMES } = require('../../constants/roles');

exports.getAllTagProject = async (query) => {
  return Models.TagProject.queryBuilder(query);
};

exports.getOneTagProject = async (id) => {
  const result = await Models.TagProject.query()
    .findById(id)
    .eager('[tags,projects]');
  if (!result) {
    throw Boom.notFound('TagProject not found');
  }

  return result;
};

exports.createTagProject = async (body) => {
  return Models.TagProject.query().insert(body);
};

exports.updateTagProject = async (id, body) => {
  try {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 5);
    }
    const result = await Models.TagProject.query()
      .update(body)
      .where('id', id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('TagProject not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteTagProject = async (id) => {
  try {
    const result = await Models.TagProject.query()
      .deleteById(id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('TagProject not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteTagProject = async (id) => {
  try {
    return Models.TagProject.query()
      .deleteById(id)
      .returning('*');
  } catch (err) {
    throw err;
  }
};
