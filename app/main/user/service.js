'use strict';

const Boom = require('boom');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Models = require('../../db/models');
const sendMail = require('../../utils/sendMail');

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

exports.getCodeResetPassword = async (id) => {
  try {
    const user = await Models.User.query()
      .findById(id)
      .select('id', 'name', 'username', 'email');
    if (!user) {
      throw Boom.notFound('User not found');
    }

    if (user.password === null) {
      throw Boom.badRequest('This account are logged from social networks');
    }

    const code = Math.random()
      .toString(36)
      .substring(7);
    const subject = 'Verification code';
    const message = `Your verification code is: <br> <strong style="font-size: 16px">${code}</strong> <br> <br>Verification code will be expired in 5 minutes. <br>If you didn’t request this please contact us immediately.<br> <br>Thanks,<br>TrendingITJob - VT`;

    try {
      await sendMail(user.email, subject, message);
      const resetPassword = {
        verificationCode: code,
        expires: Date.now() + 5 * 1000 * 60
      };
      await Models.User.query()
        .update({ resetPassword })
        .where('id', id);
      return _.assign({ verificationCode: code }, user);
    }
    catch (error) {
      throw Boom.badImplementation(
        'There was an error sending the verification code to email. Please try again.'
      );
    }
  }
  catch (err) {
    throw err;
  }
};

exports.createUser = async (body) => {
  try {
    const { email, username } = body;
    const checkUserByEmail = await Models.User.query().findOne({ email });
    if (checkUserByEmail) {
      throw Boom.badRequest('Email is exist');
    }

    const user = await Models.User.query().findOne({ username });
    if (user) {
      throw Boom.badRequest('Username is exist');
    }

    if (body.password) {
      body.password = bcrypt.hashSync(body.password, 5);
    }
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
      );
  }
  catch (err) {
    throw err;
  }
  if (body.username) {
    const username = await Models.User.query().findOne({
      username: body.username
    });
    if (username) {
      throw Boom.conflict('This username has been used');
    }
  }
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
  }
  catch (err) {
    throw err;
  }
};

exports.updatePassword = async (id, body) => {
  try {
    const user = await Models.User.query()
      .findById(id)
      .select('resetPassword');
    if (!user) {
      throw Boom.notFound('User not found');
    }
    const { verificationCode } = body;
    if (
      user.resetPassword.verificationCode === verificationCode &&
      user.resetPassword.expires >= Date.now()
    ) {
      const password = bcrypt.hashSync(body.password, 5);
      return await Models.User.query()
        .update({ password })
        .where('id', id)
        .returning('*');
    }

    return Boom.badRequest('The verification code is invalid or has expired');
  }
  catch (err) {
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
  }
  catch (err) {
    throw err;
  }
};
