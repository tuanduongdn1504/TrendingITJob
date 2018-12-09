'use strict';

const Boom = require('boom');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Models = require('../../db/models');
//dummy: del
const { ROLES, ROLENAMES } = require('../../constants/roles');

exports.getAllUser = async (query) => {
  return Models.User.queryBuilder(query);
};

exports.getOneUser = async (id) => {
  const result = await Models.User.query().findById(id);
  if (!result) {
    throw Boom.notFound('User not found');
  }

  return result;
};

exports.createUser = async (body) => {
  try {
    const { email, username } = body;
    if (email) {
      const checkUserByEmail = await Models.User.query().findOne({
        email
      });
      if (checkUserByEmail) {
        throw Boom.badRequest('Email is exist');
      }
    }
    if (username) {
      const user = await Models.User.query().findOne({
        username
      });
      if (user) {
        throw Boom.badRequest('Username is exist');
      }
    }

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 5);
    }
    // body.roleId = ROLES.WORKER;
    // const result = await Models.User.query()
    //   .insert(body)
    //   .returning('*')
    //   .select('username', 'email', 'password', 'users.id');
    // result.scope = ROLENAMES.WORKER;
    // return result;
    // dummy: del
    await Models.User.query().insert(body);

    return await Models.User.query()
      .findOne({ username: body.username })
      .innerJoin('role', 'role.id', 'users.roleId')
      .select(
        'username',
        'email',
        'password',
        'users.id',
        'role.name as scope'
      ); // <<<
  } catch (err) {
    throw err;
  }
  // if (body.username) {
  //   const username = await Models.User.query().findOne({
  //     username: body.username
  //   });
  //   if (username) {
  //     throw Boom.conflict('This username has been used');
  //   }
  // }
  let hashPassword = null;
  if (body.password) {
    hashPassword = await bcrypt.hash(body.password, 5);
  }
  const result = await Models.User.query().insert({
    email: body.email,
    username: body.username,
    password: hashPassword,
    name: body.name
  });
  return _.omit(result, 'password');
};

exports.updateUser = async (id, body) => {
  try {
    if (body.password) {
      body.password = bcrypt.hashSync(body.password, 5);
    }

    const result = await Models.User.query()
      .update(body)
      .where('id', id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('User not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteUser = async (id) => {
  try {
    const result = await Models.User.query()
      .deleteById(id)
      .returning('*');
    if (!result.length) {
      throw Boom.notFound('User not found');
    }

    return result;
  } catch (err) {
    throw err;
  }
};
