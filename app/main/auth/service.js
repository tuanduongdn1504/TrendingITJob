'use strict';

const Boom = require('boom');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const Models = require('../../db/models');
const userService = require('../user/service');
const auth = require('./authSocial');
const serviceUser = require('../user/service');
const MailUtils = require('../../emailService');

const secret = process.env.JWT_SECRET || 'tuanBear';
const mainWebUrl = process.env.WEB_URL || 'https://csm-web-staging.enouvo.com/';

exports.login = async (body) => {
  try {
    const { email } = body;
    const user = await Models.User.query()
      .findOne({ email })
      .innerJoin('role', 'role.id', 'users.roleId')
      .select(
        'username',
        'email',
        'password',
        'users.id',
        'role.name as scope'
      );
    if (!user) {
      throw Boom.notFound('This account is not exist');
    }

    const isCorrectPassword = await bcrypt.compare(
      body.password,
      user.password
    );
    if (!isCorrectPassword) {
      throw Boom.badRequest('Incorrect password');
    }

    const data = _.pick(user, ['username', 'email', 'id', 'scope']);
    return await _.assign({ token: createJwtToken(data) }, data);
  } catch (err) {
    throw err;
  }
};

exports.register = async (body) => {
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

    const result = await userService.createUser(body);
    const data = _.pick(result, ['username', 'email', 'id', 'scope']);

    return await _.assign({ token: createJwtToken(data) }, data);
  } catch (err) {
    throw err;
  }
};

exports.facebook = async (request, response) => {
  try {
    if (!request.headers.access_token && !request.query.access_token) {
      return Boom.badRequest('Access token in headers or query is required');
    }

    const profile = await new Promise((resolve, reject) => {
      auth.authenticate('facebook-token', (error, user, info) => {
        if (error) {
          resolve(error);
        }
        resolve(user);
      })(request, response);
    });

    if (!profile.id) {
      return Boom.badRequest(
        'This access token is not registered by the application'
      );
    }

    const existUser = await Models.User.query().findOne({
      facebookId: profile.id
    });

    if (existUser) {
      const data = _.pick(existUser, ['username', 'email', 'id', 'scope']);
      return await _.assign({ token: createJwtToken(data) }, data);
    }
    const { payload } = request;
    const body = {
      name: profile.displayName,
      avatar: profile.photos[0].value,
      username: profile.id,
      email: '',
      facebookId: profile.id,
      roleId: payload.roleId
    };

    const newUser = await serviceUser.createUser(body);
    const data = _.pick(newUser, ['username', 'email', 'id', 'scope']);
    return await _.assign({ token: createJwtToken(data) }, data);
  } catch (err) {
    throw err;
  }
};

exports.forgotPassword = async (email) => {
  const user = await Models.User.query().findOne({ email });
  if (!user) {
    throw Boom.notFound('Email is not found');
  }
  // Generate random token.
  const resetPasswordToken = crypto.randomBytes(64).toString('hex');
  await MailUtils.sendEmailResetPassword(
    'panzer3553@gmail.com',
    `${mainWebUrl}resetPassword?token=${resetPasswordToken}`
  );
  const resetPasswordExpire = new Date();
  resetPasswordExpire.setDate(resetPasswordExpire.getDate() + 1);
  await await Models.User.query().patchAndFetchById(user.id, {
    resetPasswordToken,
    resetPasswordExpire: resetPasswordExpire.toISOString() // Token will expire in 24 hours
  });
  return { message: 'Your reset password request has been confirmed' };
};

exports.resetPassword = async (token, password) => {
  const user = await Models.User.query()
    .where('resetPasswordToken', token)
    .where('resetPasswordExpire', '>', new Date().toISOString())
    .first();
  if (!user) {
    throw Boom.conflict('Your password token is incorrect ore expired');
  }
  const newHashPassword = await bcrypt.hash(password, 5);
  await Models.User.query().patchAndFetchById(user.id, {
    resetPasswordToken: null,
    resetPasswordExpire: null,
    password: newHashPassword
  });
  return { message: 'Your password has been reset' };
};

function createJwtToken(data) {
  return jsonwebtoken.sign(
    _.assign(data, {
      ttl: Math.floor(Date.now() / 1000) - 60 * 60
    }),
    secret
  );
}
