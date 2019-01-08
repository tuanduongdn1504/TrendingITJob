'use strict';

const Boom = require('boom');
const Models = require('../../db/models');
const bcrypt = require('bcrypt');
const { ROLES, ROLENAMES } = require('../../constants/roles');

exports.getAllProject = async (query) => {
  return Models.Project.queryBuilder(query);
};

exports.getOneProject = async (id) => {
  const result = await Models.Project.query()
    .findById(id)
    .eager('productOwners');
  if (!result) {
    throw Boom.notFound('Project not found');
  }

  return result;
};

exports.createProject = async (body) => {
  return Models.Project.query().insert(body);
};

exports.updateProject = async (id, body) => {
  try {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 5);
    }
    const result = await Models.Project.query()
      .update(body)
      .where('id', id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('Project not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteProject = async (id) => {
  try {
    const result = await Models.Project.query()
      .deleteById(id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('Project not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteProject = async (id) => {
  try {
    return Models.Project.query()
      .deleteById(id)
      .returning('*');
  } catch (err) {
    throw err;
  }
};
