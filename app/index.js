'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Relish = require('relish');
const Boom = require('boom');
const HapiSwagger = require('hapi-swagger');
const hapiAuthJWT = require('hapi-auth-jwt2');
const routes = require('./main/routes');

require('dotenv').config();

// create new server instance
const server = new Hapi.Server({
  host: process.env.APP_HOST || 'localhost',
  port: process.env.PORT || 3000,
  routes: {
    cors: true,
    validate: {
      failAction: async (request, h, err) => {
        if (process.env.NODE_ENV === 'production') {
          // In prod, log a limited error message and throw the default Bad Request error.
          throw err;
        } else {
          // During development, log and respond with the full error.
          console.error(err);
          throw err;
        }
      }
    }
  }
});

const validateUser = (decoded, request) => {
  // This is a simple check that the `sub` claim
  // exists in the access token. Modify it to suit
  // the needs of your application
  if (decoded && decoded.id) {
    return { isValid: true };
  }

  return { isValid: false };
};

const apiVersionOptions = {
  basePath: '/api',
  validVersions: [1, 2],
  defaultVersion: 1,
  vendorName: 'api'
};

const swaggerOptions = {
  pathPrefixSize: 3,
  host: process.env.HOST,
  basePath: apiVersionOptions.basePath,
  info: {
    title: 'TrendingITJob API Documentation',
    description: 'This is a TrendingITJob API documentation.'
  },
  deReference: false
};

const loggerOptions = {
  ops: {
    interval: 1000
  },
  reporters: {
    myConsoleReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*' }]
      },
      {
        module: 'good-console'
      },
      'stdout'
    ],
    myFileReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ ops: '*' }]
      },
      {
        module: 'good-squeeze',
        name: 'SafeJson'
      }
    ],
    myHTTPReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ error: '*' }]
      },
      {
        module: 'good-http',
        args: [
          'http://prod.logs:3000',
          {
            wreck: {
              headers: { 'x-api-key': 12345 }
            }
          }
        ]
      }
    ]
  }
};

process.on('uncaughtException', (err) => {
  console.log(err, 'Uncaught exception');
  process.exit(1);
});
//
// process.on('unhandledRejection', (reason, promise) => {
//   logger.error(
//     {
//       promise: promise,
//       reason: reason
//     },
//     'unhandledRejection'
//   );
//   process.exit(1);
// });
//
// process.on('SIGINT', gracefulStopServer);
// process.on('SIGTERM', gracefulStopServer);

async function start() {
  // start your server
  try {
    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      },
      hapiAuthJWT
    ]);
    server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT_SECRET || 'tuanBear',
      validate: validateUser,
      verifyOptions: { ignoreExpiration: true }
    });

    server.auth.default('jwt');
    server.route(routes);
    await server.start();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Server running at: ', server.info.uri);
}

start();

module.exports = server;
