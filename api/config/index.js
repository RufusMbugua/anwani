/** * Load Module dependencies.
 */
var path = require('path');

var cfenv = require('cfenv');

var env     = process.env;
//var appEnv  = cfenv.getAppEnv();

//var MONGO_SERVICE       = appEnv.getService('mongodb01') || {};
//var MONGO_SERVICE_INFO  = MONGO_SERVICE.credentials || {};
//var PORT          = env.PORT || 5050;
//var HOST          = appEnv.bind || 'localhost';
//var API_URL       = HOST + ':' + PORT;
//var MONGODB_URL   = MONGO_SERVICE_INFO.url || 'mongodb://127.0.0.1:27017/anwani';

var PORT        = env.PORT || 5050;
var API_URL     = 'http://anwani-devapi.c4asolution.com';
var MONGODB_URL = env.MONGODB_URL || 'mongodb://127.0.0.1:27017/anwani';
var NODE_ENV    = env.NODE_ENV || 'development';
var HOST        = 'localhost';

module.exports = {

  API_URL: API_URL,

  ENV: NODE_ENV,

  PORT: PORT,

  HOST: HOST,

  // MongoDB URL
  MONGODB_URL: MONGODB_URL,

  SALT_FACTOR: 12,

  TOKEN: {
    RANDOM_BYTE_LENGTH: 32
  },

  VIRTUAL_CODE_LENGTH: 4,

  SECURITY_ANSWER_SALT: 'ylHUMaVrS0dpcO/+nT+6aAVVGcRJzuSocoLJDoJgBlaAYTdq',

  MEDIA: {
    FILE_SIZE: 2 * 1024 * 1024, // 1MB,
    URL: API_URL + '/media/',
    FILES_FOLDER: path.resolve(process.cwd(), './media') + '/'
  },

  MAX_ADDRESSES: 5,

  VERIFICATION: {
    ON: true,
    TOKEN_LENGTH: 24
  },

  SMTP: {
    SERVICE: 'Gmail',
    USER: env.SMTP_USER,
    PASS: env.SMTP_PASS
  },

  PLANS: {
    BASIC: 100,
    PRO: 1000,
    PREMIUM: 10000
  }
};
