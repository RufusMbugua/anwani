/**
 * Load Module dependencies
 */
var debug = require('debug')('anwani-api:routes');


var pkg                   = require('../package.json');
var usersController       = require('./users');
var addressesController   = require('./addresses');
var subscribersController = require('./subscribers');
var setupController       = require('./setup');
var logsController        = require('./logs');

module.exports = function initRoutes(app) {
  debug('loading routes');

  app.use('/users',       usersController);
  app.use('/addresses',   addressesController);
  app.use('/subscribers', subscribersController);
  app.use('/logs',        logsController);
  app.use('/_config/setup', setupController);

  app.get('/', function (req, res) {
    res.json({
      name: pkg.name,
      description: pkg.description,
      version: pkg.version,
      docs: 'anwani-devapi.c4asolution.com/documentation',
      uptime: process.uptime()
    });
  });

  debug('routes loaded');
};

module.exports.OPEN_ROUTES = [
  /\/media\/.*/,
  /\/documentation\/.*/,
  /\/subscribers\/verify\/.*/,
  '/users/login',
  '/_config/setup/docs-user',
  '/users/signup',
  '/subscribers/login',
  '/subscribers/signup',
  '/users/password/update',
  '/logs/create',
  '/'
];
