'use strict';

const Boom = require('boom');
const Models = require('../../db/models');

exports.getAllProductOwner = async (query) => {
  return Models.ProductOwner.queryBuilder(query);
};

exports.getOneProductOwner = async (id) => {
  const result = await Models.ProductOwner.query().findById(id);
  if (!result) {
    throw Boom.notFound('ProductOwner not found');
  }

  return result;
};

exports.createProductOwner = async (body) => {
  return Models.ProductOwner.query().insert(body);
};

exports.updateProductOwner = async (id, body) => {
  try {
    const result = await Models.ProductOwner.query()
      .update(body)
      .where('id', id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('ProductOwner not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteProductOwner = async (id) => {
  try {
    const result = await Models.ProductOwner.query()
      .deleteById(id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('ProductOwner not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteProductOwner = async (id) => {
  try {
    return Models.ProductOwner.query()
      .deleteById(id)
      .returning('*');
  } catch (err) {
    throw err;
  }
};
