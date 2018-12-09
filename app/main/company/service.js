'use strict';

const Boom = require('boom');
const Models = require('../../db/models');

exports.getAllCompany = async (query) => {
  return Models.Company.queryBuilder(query);
};

exports.getOneCompany = async (id) => {
  const result = await Models.Company.query().findById(id);
  if (!result) {
    throw Boom.notFound('Company not found');
  }

  return result;
};

exports.createCompany = async (body) => {
  return Models.Company.query().insert(body);
};

exports.updateCompany = async (id, body) => {
  try {
    const result = await Models.Company.query()
      .update(body)
      .where('id', id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('Company not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteCompany = async (id) => {
  try {
    const result = await Models.Company.query()
      .deleteById(id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('Company not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteCompany = async (id) => {
  try {
    return Models.Company.query()
      .deleteById(id)
      .returning('*');
  } catch (err) {
    throw err;
  }
};
