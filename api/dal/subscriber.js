// Access Layer for Subscriber Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('anwani-api:dal-subscriber');
var moment  = require('moment');
var _       = require('lodash');

var Subscriber      = require('../models/subscriber');

var returnFields = Subscriber.whitelist;
var population = [];

/**
 * create a new subscriber.
 *
 * @desc  creates a new subscriber and saves them
 *        in the database
 *
 * @param {Object}  subscriberData  Data for the subscriber to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(subscriberData, cb) {
  debug('creating a new subscriber');

  var searchQuery = { email: subscriberData.email };

  // Make sure subscriber does not exist
  Subscriber.findOne(searchQuery, function subscriberExists(err, isPresent) {
    if(err) {
      return cb(err);
    }

    if(isPresent) {
      return cb(new Error('Subscriber Already exists'));
    }


    // Create subscriber if is new.
    var subscriberModel  = new Subscriber(subscriberData);

    subscriberModel.save(function saveSubscriber(err, data) {
      if (err) {
        return cb(err);
      }


      exports.get({ _id: data._id }, function (err, subscriber) {
        if(err) {
          return cb(err);
        }

        cb(null, subscriber);

      });

    });

  });

};

/**
 * delete a subscriber
 *
 * @desc  delete data of the subscriber with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting subscriber: ', query);

  Subscriber
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteSubscriber(err, subscriber) {
      if (err) {
        return cb(err);
      }

      if(!subscriber) {
        return cb(null, {});
      }

      subscriber.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, subscriber);

      });

    });
};

/**
 * update a subscriber
 *
 * @desc  update data of the subscriber with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating subscriber: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true,
    select: returnFields
  };

  var data = {};

  data.$set = updates.$set || {};

  data.$set.last_modified = now;

  Subscriber
    .findOneAndUpdate(query, data, opts)
    .populate(population)
    .exec(function updateSubscriber(err, subscriber) {
      if(err) {
        return cb(err);
      }

      cb(null, subscriber || {});
    });
};

/**
 * get a subscriber.
 *
 * @desc get a subscriber with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting subscriber ', query);

  Subscriber
    .findOne(query, returnFields)
    .populate(population)
    .exec(function(err, subscriber) {
      if(err) {
        return cb(err);
      }

      cb(null, subscriber || {});
    });
};

/**
 * get a collection of subscribers
 *
 * @desc get a collection of subscribers from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, qs, cb) {
  debug('fetching a collection of subscribers');

  var opts = {
    columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };


  Subscriber.paginate(query, opts, function (err, docs, page, count) {
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

/**
 * Hash password
 */
exports.hashPasswd = function hashPasswd(passwd, cb) {
  Subscriber.hashPasswd(passwd, cb);
};

