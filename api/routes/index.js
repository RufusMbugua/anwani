/**
 * Load Module dependencies
 */
var debug = require('debug')('anwani-api:routes');

var pkg                   = require('../package.json');
var usersController       = require('./users');
var addressesController   = require('./addresses');
var subscribersController = require('./subscribers');

module.exports = function initRoutes(app) {
  debug('loading routes');

  app.use('/users',       usersController);
  app.use('/addresses',   addressesController);
  app.use('/subscribers', subscribersController);

  app.get('/', function (req, res) {
    res.redirect('/documentation');
  });

  debug('routes loaded');
};
