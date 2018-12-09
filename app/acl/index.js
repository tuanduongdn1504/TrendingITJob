'use strict';

const redis = require('../redis');
const aclRule = require('./config');

const prefix = 'aclrule';

class ACL {
  constructor() {
    // When init database create a acl instance on redisClient
    this.initAcl();
  }

  // Initialize acl database
  initAcl() {
    const flattenrules = this.flattenAclRule(aclRule);
    const pipeline = redis.pipeline();
    Object.keys(flattenrules).forEach((key) => {
      pipeline.set(`${prefix}_${key}`, JSON.stringify(flattenrules[key]));
    });
    pipeline.exec();
  }

  // Flatten object acl to easy to store in redis
  flattenAclRule(rules) {
    const result = {};
    Object.keys(rules).forEach((role) => {
      rules[role].forEach((record) => {
        result[`${role}.${record.resource}`] = record.permissions;
      });
    });
    return result;
  }

  async checkRolePermission(role, resource, permission) {
    const aclcache = await redis.get(`${prefix}_${role}.${resource}`);
    if (!aclcache) {
      return false;
    }

    const permissions = JSON.parse(aclcache);
    if (permission && permissions.indexOf(permission) > -1) {
      return true;
    }

    return false;
  }
}

module.exports = new ACL();
