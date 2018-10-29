'use strict';

const Redis = require('ioredis');

const env = process.env.NODE_ENV || 'development';

const REDIS_URL = env === 'development' ? null : 'redis://h:p19be0a8dc78a6a332ca42d185b88d63ff6a0319f5ad1ca2d4cd0aec4a4fc9f95@ec2-54-236-162-33.compute-1.amazonaws.com:57719';

function createRedisClient() {
  let redisInstance;
  if (REDIS_URL) {
    redisInstance = new Redis(REDIS_URL);
  } else {
    redisInstance = new Redis();
  }

  return redisInstance;
}

module.exports = createRedisClient();
