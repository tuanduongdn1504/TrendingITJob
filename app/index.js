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
//option: 1
const corsHeaders = {
  origin: ['*'],
  headers: ['Origin', 'X-Requested-With', 'Content-Type'],
  credentials: true,
  additionalHeaders: [
    'access-control-allow-headers',
    'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, CORRELATION_ID'
  ],
  additionalExposedHeaders: [
    'access-control-allow-headers',
    'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, CORRELATION_ID'
  ]
};

// Options 2:
// const corsHeaders = {
//   origin: ['*'],
//   headers: [
//     'Access-Control-Allow-Origin',
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type',
//     'CORELATION_ID'
//   ],
//   credentials: true,
//   additionalHeaders: [
//     'access-control-allow-headers',
//     'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, CORRELATION_ID'
//   ],
//   additionalExposedHeaders: [
//     'access-control-allow-headers',
//     'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, CORRELATION_ID'
//   ]
// };

// Options 3:
// const corsHeaders = {
//   origin: ['*'],
//   headers: [
//     'Access-Control-Allow-Origin',
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type',
//     'CORELATION_ID'
//   ],
//   credentials: true
// };

// create new server instance
const server = new Hapi.Server({
  host: process.env.APP_HOST || 'localhost',
  port: ~~process.env.PORT || 3000,
  routes: {
    // cors: {
    //   origin: ['*'],
    //   additionalHeaders: ['token']
    // }
    // ------------
    // cors: {
    //   origin: ['*'],
    //   headers: ['Accept', 'Content-Type'],
    //   additionalHeaders: ['X-Requested-With']
    // },
    // ------------
    // method: '*',
    // path: '/{any*}',
    // config: {
    //   cors: corsHeaders
    // },
    // handler: function (request, reply) {
    //   reply(Boom.notFound());
    // },
    // >>> cors
    cors: corsHeaders,
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
    description:
      'This is a TrendingITJob API documentation.' +
      '\n' +
      '###Basic api query use for getAll resources. Only support normal query if need complex or advanced use cases(fulltextsearch, geolocation...) contact server developers to support more.' +
      '\n' +
      '###$ Paginate with limit and offset. \nEx: ?limit=5&offset=5\n' +
      '###$ Order by fields and order reverse use prefix "-". \n Ex: ?orderBy=age,-name' +
      '\n' +
      '###$ Include other relate models(rare case caution on use). \nEx: users?includes=books (user has many books)' +
      '\n' +
      '###$ Select field on query (Only use in single models). \nEx: ?fields=age,name' +
      '\n' +
      '###$ Filter equal \n?filter={"name": "Tuan"}' +
      '\n' +
      '###$ Filter less than \n?filter={"age": {"$lt": 40}}' +
      '\n' +
      '###$ Filter greater than \n?filter={"age": {"$gt": 20}}' +
      '\n' +
      '###$ Filter less than and equal \n?filter={"age": {"$lte": 40}}' +
      '\n' +
      '###$ Filter greater than equal \n?filter={"age": {"$gte": 20}}' +
      '\n' +
      '###$ Filter field in many choice \n?filter={"name": {"$in": ["Tuan", "MMMM"]}}' +
      '\n' +
      '###$ Filter array field is subset of parent array \n?filter={"tags": {"$all": ["JAV", "Lesbian"]}}' +
      '\n' +
      '###$ Filter field by text \n?filter={"name": {"$like": "%oan%"}}'
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
