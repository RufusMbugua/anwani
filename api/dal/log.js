// Access Layer for Log Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('anwani-api:dal-log');
var moment  = require('moment');
var _       = require('lodash');

var Log = require('../models/log');

var returnFields = Log.whitelist;
var population = [];

/**
 * create a new log.
 *
 * @desc  creates a new log and saves them
 *        in the database
 *
 * @param {Object}  logData  Data for the log to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(logData, cb) {
  debug('creating a new log');

  // Create log if is new.
  var logModel  = new Log(logData);

  logModel.save(function saveLog(err, data) {
    if (err) {
      return cb(err);
    }

    exports.get({ _id: data._id }, function(err, log) {
      if(err) {
        return cb(err);
      }
      return cb(null, log);
    });

  });


};

/**
 * delete a log
 *
 * @desc  delete data of the log with the given
 *        id
 *
 * @param {Object} query  Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting log: ', query);

  Log
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteLog(err, log) {
      if (err) {
        return cb(err);
      }

      if(!log) {
        return cb(null, {});
      }

      log.remove(function(err) {
        if(err) { return cb(err); }

        cb(null, log || {});
      });

  });
};

/**
 * update a log
 *
 * @desc  update data of the log with the given
 *        id
 *
 * @param {Object} query  Query Object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating log: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true,
    select: returnFields
  };

  updates.$set = updates.$set || {};

  updates.$set.last_modified = now;

  Log
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateLog(err, log) {
      if(err) {
        return cb(err);
      }

      cb(null, log || {});
    });
};

/**
 * get a log.
 *
 * @desc get a log with the given id from db
 *
 * @param {Object} query  Query object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting log ', query);

  Log
    .findOne(query, returnFields)
    .populate(population)
    .exec(function getLog(err, log) {
      if(err) {
        return cb(err);
      }

      cb(null, log || {});

  });
};

/**
 * get a collection of loges
 *
 * @desc get a collection of loges from db
 *
 * @param {Object} query Query object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, qs, cb) {
  debug('fetching a collection of loges ', query);

  var opts = {
    columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };


  Log.paginate(query, opts, function (err, docs, page, count) {
    if(err) {
      return cb(err);
    }


    var data = {
      total_pages: page,
      total_docs_count: count,
      docs: docs
    };

    cb(null, data);

  });

};
