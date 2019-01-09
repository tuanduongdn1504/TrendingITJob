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
  const company = await Models.Company.query().findById(body.companyId);
  if (!company) {
    throw Boom.badRequest('Invalid companyId');
  }
  company.numberOfJob >= 0
    ? (company.numberOfJob = company.numberOfJob + 1)
    : (company.numberOfJob = 1);
  await Models.Company.query()
    .update(company)
    .where('id', body.companyId)
    .returning('*');
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
  const post = await Models.Post.query().findById(id);

  const company = await Models.Company.query().findById(post.companyId);
  if (!company) {
    throw Boom.badRequest('Invalid companyId');
  }
  company.numberOfJob > 0
    ? (company.numberOfJob = company.numberOfJob - 1)
    : (company.numberOfJob = 0);

  await Models.Company.query()
    .update(company)
    .where('id', post.companyId)
    .returning('*');
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

// exports.deletePost = async (id) => {
//   try {
//     return Models.Post.query()
//       .deleteById(id)
//       .returning('*');
//   } catch (err) {
//     throw err;
//   }
// };
