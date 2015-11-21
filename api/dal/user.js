// Access Layer for User Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('anwani-api:dal-user');
var moment  = require('moment');
var _       = require('lodash');

var User      = require('../models/user');
var Address   = require('../models/address');

var returnFields = User.whitelist;
var population = [{
  path: 'addresses',
  select: Address.whitelist,
  match: { archived: false }
}];

/**
 * create a new user.
 *
 * @desc  creates a new user and saves them
 *        in the database
 *
 * @param {Object}  userData  Data for the user to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(userData, cb) {
  debug('creating a new user');

  var searchQuery = { phone_number: userData.phone_number };

  // Make sure user does not exist
  User.findOne(searchQuery, function userExists(err, isPresent) {
    if(err) {
      return cb(err);
    }

    if(isPresent) {
      return cb(new Error('User Already exists'));
    }


    // Create user if is new.
    var userModel  = new User(userData);

    userModel.save(function saveUser(err, data) {
      if (err) {
        return cb(err);
      }


      exports.get({ _id: data._id }, function (err, user) {
        if(err) {
          return cb(err);
        }

        cb(null, user);

      });

    });

  });

};

/**
 * delete a user
 *
 * @desc  delete data of the user with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting user: ', query);

  User
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteUser(err, user) {
      if (err) {
        return cb(err);
      }

      if(!user) {
        return cb(null, {});
      }

      user.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, user);

      });

    });
};

/**
 * update a user
 *
 * @desc  update data of the user with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating user: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true,
    select: returnFields
  };

  var data = {};

  data.$set = updates.$set || {};

  data.$set.last_modified = now;

  (Object.keys(updates)).forEach(function (key) {
    data[key] = updates[key];
  });


  User
    .findOneAndUpdate(query, data, opts)
    .populate(population)
    .exec(function updateUser(err, user) {
      if(err) {
        return cb(err);
      }

      cb(null, user || {});
    });
};

/**
 * get a user.
 *
 * @desc get a user with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting user ', query);

  User
    .findOne(query, returnFields)
    .populate(population)
    .exec(function(err, user) {
      if(err) {
        return cb(err);
      }

      cb(null, user || {});
    });
};

/**
 * get a collection of users
 *
 * @desc get a collection of users from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, qs, cb) {
  debug('fetching a collection of users');

  var opts = {
    columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };


  User.paginate(query, opts, function (err, docs, page, count) {
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
  User.hashPasswd(passwd, cb);
};
