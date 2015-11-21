/** *
 * Load Module Dependencies.
 */
var EventEmitter = require('events').EventEmitter;
var crypto = require('crypto');

var debug = require('debug')('anwani-api:log-controller');
var async = require('async');
var moment = require('moment');
var _     = require('lodash');

var Log         = require('../dal/log');
var LogModel    = require('../models/log');
var config      = require('../config');
var CustomError = require('../lib/custom-error');


/**
 * Create a new log
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.create = function createLog(req, res, next) {
  debug('create log');

  // Begin workflow
  var workflow = new EventEmitter();
  var body  = req.body;

  // validating log data
  // cant trust anyone
  workflow.on('validate', function validateLog() {
    var errs = req.validationErrors();

    if(errs) {
      return next(CustomError({
        name: 'LOG_CREATION_ERROR',
        message: errs.message
      }));
    }

    workflow.emit('createLog');
  });


  workflow.on('createLog', function createLog() {

    var body = req.body;

    Log.create(body, function (err, log) {
      if(err) {
        return next(CustomError({
          name: 'LOG_CREATION_ERROR',
          message: err.message
        }));
      }

      res.json(log);
    });


  });

  workflow.emit('validate');
};


/**
 * Get a single log.
 *
 * @desc Fetch a log with the given id from the database.
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.fetchOne = function fetchOneLog(req, res, next) {
  debug('fetch log:' + req.params.id);

  var query = {
    _id: req.params.id
  };

  Log.get(query, function cb(err, log) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }

    res.json(log);
  });
};

/**
 * Update a single log.
 *
 * @desc Fetch a log with the given id from the database
 *       and update their data
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.update = function updateLog(req, res, next) {
  debug('updating log:'+ req.params.id);

  var query = {
    _id: req.params.id
  };
  var body = req.body;
  var update;

  update = {
    $set: body
  };

  Log.update(query, update, function cb(err, log) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }

    res.json(log || {});

  });

};

/**
 * Delete a single log.
 *
 * @desc Fetch a log with the given id from the database
 *       and delete their data
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.delete = function deleteLog(req, res, next) {
  debug('deleting log:' + req.params.id);

  var query = {
    _id: req.params.id
  };

  Log.delete(query, function cb(err, log) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }

    res.json(log || {});
  });
};

/**
 * Get a collection of logs
 *
 * @desc Fetch a collection of logs
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.fetchAll = function fetchAllLogs(req, res, next) {
  debug('get a collection of logs');

  // retrieve pagination query params
  var page   = req.query.page || 1;
  var limit  = req.query.per_page || 100;

  var opts = {
    page: page,
    limit: limit,
    sort: { date_created: -1 }
  };
  var query = {};

  Log.getCollection(query, opts, function cb(err, loges) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }

    res.json(loges);
  });
};

/**
 * categories:
 * - source: android|web|api
 * - type: error|bug
 * - start_date: Date_UTC_format
 * - solved:true|false
 */
exports.search = function search(req, res, next) {
  debug('search logs by categories');

  var qs    = req.query;
  var query = {};

  if(!(Object.keys(qs)).length) {
    return next(CustomError({
      name: 'LOG_SEARCH_ERROR',
      message: 'Please provide a query search'
    }));
  }

  (Object.keys(qs)).forEach(function (key) {
    query[key] = qs[key];
  });

  if(query.start_date) {
    query = {
      date_created: {
        $gte: query.start_date
      }
    };
  }

  LogModel
    .find(query, LogModel.whitelist, { sort: { date_created: -1 } })
    .exec(function (err, logs) {
      if(err) {
        return next(CustomError({
          name: 'SERVER_ERROR',
          message: err.message
        }));
      }

      res.json(logs);
    });

};
