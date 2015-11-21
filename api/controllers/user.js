/**
 *
 * Load Module Dependencies.
 */
var EventEmitter = require('events').EventEmitter;

var debug   = require('debug')('anwani-api:user-controller');
var async   = require('async');
var moment  = require('moment');
var _       = require('lodash');
var emquery = require('emquery');

var Address            = require('../dal/address');
var AddressModel       = require('../models/address');
var User               = require('../dal/user');
var Token              = require('../dal/token');
var UserModel          = require('../models/user');
var config             = require('../config');
var CustomError        = require('../lib/custom-error');
var hashSecurityAnswer = require('../lib/utils').hashSecurityAnswer;

/**
 * Create a user.
 *
 * @desc create a user and add them to the database
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.create = function createUser(req, res, next) {
  debug('create user');

  // Begin workflow
  var workflow = new EventEmitter();

  // validating user data
  // cant trust anyone
  workflow.on('validate', function validateUser() {

    var errs = req.validationErrors();

    if(errs) {
      return next(CustomError({
        name: 'USER_CREATION_ERROR',
        message: errs.message
      }));
    }

    workflow.emit('createUser');
  });

  workflow.on('createUser', function createUser() {
    var body = req.body;

    User.create(body, function (err, user) {
      if(err) {
        return next(CustomError({
          name: 'USER_CREATION_ERROR',
          message: err.message
        }));
      }

      res.status(201).json(user);


    });


  });

  workflow.emit('validate');
};

/**
 * Get a single user.
 *
 * @desc Fetch a user with the given id from the database.
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.fetchOne = function fetchOneUser(req, res, next) {
  debug('fetch user:' + req.params.id);

  var query = {
    _id: req.params.id
  };

  User.get(query, function cb(err, user) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }

    res.json(user);
  });
};

/**
 * Update a single user.
 *
 * @desc Fetch a user with the given id from the database
 *       and update their data
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.update = function updateUser(req, res, next) {
  debug('updating user:'+ req.params.id);

  var query = {
    _id: req.params.id
  };
  var body = req.body;
  var data;

  data = {
    $set: emquery(body)
  };

  User.update(query, data, function cb(err, user) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }

    res.json(user || {});

  });

};

/**
 * Delete/Archive a single user.
 *
 * @desc Fetch a user with the given id from the database
 *       and delete their data
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.delete = function deleteUser(req, res, next) {
  debug('deleting user:' + req.params.id);

  var query = {
    _id: req.params.id
  };

  var update = {
    $set: { archived: true, addresses: [] }
  };
  var user  = req._user;
  var now   = moment().toISOString();
  var tokenQuery = {
    user: user._id
  };
  var tokenUpdates = {
    $set: {
      value: 'EMPTY',
      revoked: true
    }
  };

  User.update(query, update, function cb(err, user) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }


    Token.update(tokenQuery, tokenUpdates, function(err, token) {
      if(err) {
        return next(CustomError({
          name: 'SERVER_ERROR',
          message: err.message,
          status: 500
        }));
      }

      res.json(user);
    });

  });

};

/**
 * Get a collection of users
 *
 * @desc Fetch a collection of users
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.fetchAll = function fetchAllUsers(req, res, next) {
  debug('get a collection of users');

  // retrieve pagination query params
  var page   = req.query.page || 1;
  var limit  = req.query.per_page || 10;

  var opts = {
    page: page,
    limit: limit,
    sort: { }
  };
  var query = {};

  User.getCollection(query, opts, function cb(err, users) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }

    res.json(users);
  });
};

/**
 * Get a collection of user's addresses
 *
 * @desc Fetch a collection of user's addresses
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.fetchUserAddresses = function fetchAllUserAddresses(req, res, next) {
  debug('get a collection of user addresses');

  Address.getUsersCollection(req.params.id, 'service', function (err, addresses) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }

    res.json(addresses);
  });
};

/**
 * Get a collection of user's addresses for Mobile
 *
 * @desc Fetch a collection of user's addresses
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.fetchUserAddressesMobile = function fetchAllUserAddressesMobile(req, res, next) {
  debug('get a collection of user addresses - mobile');

  Address.getUsersCollection(req.params.id, 'mobile', function (err, addresses) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }

    res.json(addresses);
  });
};


/**
 * Update the password of a user
 *
 * @desc
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.updatePassword = function updatePassword(req, res, next) {
  debug('updating password for ' + req.body.phone_number);

  var body = req.body;
  var keys = Object.keys(body);

  if(keys.length < 4) {
    return next(CustomError({
      name: 'PASSWORD_UPDATE_ERROR',
      message: 'Phone number, New password/pin and Security Question/Answer Combo not provided'
    }));
  }

  var query = {
    phone_number: body.phone_number
  };

  async.waterfall([
    function findUser(done) {
      UserModel.findOne(query, function (err, user) {
        if(err) {
          return done(CustomError({
            name: 'SERVER_ERROR',
            message: err.message,
            status: 500
          }));
        }

        if(!user._id) {
          return done(CustomError({
            name: 'PASSWORD_UPDATE_ERROR',
            message: 'Id(' + id + ') is not recognized'
          }));

        }

        if(body.security_question !== user.security_pass.question) {
          return done(CustomError({
            name: 'PASSWORD_UPDATE_ERROR',
            message: 'Security questions dont match'
          }));
        }

        done(null, user);
      });
    },
    function verifySecurityQuestion(user, done) {
      hashSecurityAnswer(body.security_answer, function (err, hashed) {
        if(err) {
          return done(CustomError({
            name: 'SERVER_ERROR',
            message: err.message,
            status: 500
          }));
        }

        if(user.security_pass.answer !== hashed) {
          return done(CustomError({
            name: 'PASSWORD_UPDATE_ERROR',
            message: 'Security question answer dont match'
          }));
        } else {

          return done(null, user);
        }
      });
    },
    function hashNewPassword(user, done) {
      User.hashPasswd(body.new_password, function (err, hash) {
        if(err) {
          return done(CustomError({
            name: 'SERVER_ERROR',
            message: err.message,
            status: 500
          }));
        }

        var update = {
          password: hash
        };

        done(null, update, user);
      });
    },
    function updateUserPassword(update, user, done) {
      query = {
        _id: user._id
      };

      User.update(query, update, function cb(err, user) {
        if(err) {
          return done(CustomError({
            name: 'SERVER_ERROR',
            message: err.message,
            status: 500
          }));
        }


        done(null, { updated: true });

      });
    }
  ], function (err, results) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }

    res.json(results);

  });
};
