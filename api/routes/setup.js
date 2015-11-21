/**
 * Load Module dependencies
 */
var express = require('express');
var debug = require('debug');

var Admin = require('../models/admin');
var config = require('../config');
var CustomError = require('../lib/custom-error');

var router = express.Router();

router.post('/docs-user', function (req, res, next) {
  debug('setting up docs user');

  req.assert('email', 'Email is invalid').notEmpty().isEmail();
  req.assert('password', 'Password is invalid').notEmpty();

  var errs = req.validationErrors();

  if(errs) {
    return next(CustomError({
      name: 'SETUP_ERROR',
      message: errs.message
    }));
  }

  var body = req.body;
  var devAdmin = {
    email: body.email,
    password: body.password,
    first_name: body.first_name || 'API',
    last_name: body.last_name || 'DEVELOPER'
  };

  var admin = new Admin(devAdmin);

  admin.save(function(err, doc) {
    if(err) {
      return next(CustomError({
        name: 'SETUP_ERROR',
        message: err.message
      }));
    }

    res.json({ email: doc.email, first_name: doc.first_name });
  });
});

module.exports = router;
