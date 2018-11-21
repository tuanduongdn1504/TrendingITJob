'use strict';

const path = require('path');

const BASE_PATH = path.join(__dirname, 'app', 'db');

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost:5432/ITJob',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/ITJob',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  production: {
    client: 'pg',
    connection:
      'postgres://wbrtvnuzvkzugi:9614a0d1a994a22a979dc330b130d682712fb0ccdd95761e10cffc896a606561@ec2-54-225-110-156.compute-1.amazonaws.com:5432/dak81h5ppbblvi',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
};
