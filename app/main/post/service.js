'use strict';

const Boom = require('boom');
const Models = require('../../db/models');
const bcrypt = require('bcrypt');
const { ROLES, ROLENAMES } = require('../../constants/roles');

exports.getAllPost = async (query) => {
  return Models.Post.queryBuilder(query);
};

exports.getOnePost = async (id) => {
  const result = await Models.Post.query()
    .findById(id)
    .eager('companies');
  if (!result) {
    throw Boom.notFound('Post not found');
  }

  return result;
};

exports.createPost = async (body) => {
  return Models.Post.query().insert(body);
};

exports.updatePost = async (id, body) => {
  try {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 5);
    }
    const result = await Models.Post.query()
      .update(body)
      .where('id', id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('Post not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deletePost = async (id) => {
  try {
    const result = await Models.Post.query()
      .deleteById(id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('Post not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deletePost = async (id) => {
  try {
    return Models.Post.query()
      .deleteById(id)
      .returning('*');
  } catch (err) {
    throw err;
  }
};
