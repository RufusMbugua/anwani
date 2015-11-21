// Access Layer for Token Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('anwani-api:dal-token');
var moment  = require('moment');
var _       = require('lodash');

var Token = require('../models/token');
var User  = require('../models/user');
var Subscriber  = require('../models/subscriber');

var returnFields = Token.whitelist;
var population = [{
  path: 'user',
  select: { _id: 1, realm: 1, role: 1, archived: 1 }
}, {
  path: 'subscriber',
  select: { _id: 1, realm: 1, role: 1, archived: 1 , verified: 1, subscription_plan: 1, subscription_on: 1 }
}];

/**
 * create a new token.
 *
 * @desc  creates a new token and saves them
 *        in the database
 *
 * @param {Object}  tokenData  Data for the token to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(tokenData, cb) {
  debug('creating a new token');

  var query;

  if(tokenData.user) {
    query = { user: tokenData.user };
  } else {
    query = { subscriber: tokenData.subscriber };
  }

  // Make sure token does not exist
  Token.findOne(query, function tokenExists(err, isPresent) {
    if(err) {
      return cb(err);
    }

    if(isPresent) {
      exports.get({ _id: isPresent._id }, function(err, token) {
        if(err) {
          return cb(err);
        }
        cb(null, token);
      });
      return;
    }

    // Create token if is new.
    var tokenModel  = new Token(tokenData);

    tokenModel.save(function saveToken(err, data) {
      if (err) {
        return cb(err);
      }

      exports.get({ _id: data._id }, function(err, token) {
        if(err) {
          return cb(err);
        }
        cb(null, data);
      });

    });
  });
};

/**
 * delete a token
 *
 * @desc  delete data of the token with the given
 *        id
 *
 * @param {Object} query  Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting token: ', query);

  Token
    .findOne(query, opts)
    .populate(population)
    .exec(function deleteToken(err, token) {
      if (err) {
        return cb(err);
      }

      if(!token) {
        return cb(null, {});
      }

      token.remove(function(err) {
        if(err) { return cb(err); }
        cb(null, token);
      });

  });
};

/**
 * update a token
 *
 * @desc  update data of the token with the given
 *        id
 *
 * @param {Object} query  Query Object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating token: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true,
    select: returnFields
  };

  updates.$set.last_modified = now;

  Token
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateToken(err, token) {
      if(err) {
        return cb(err);
      }

      cb(null, token);
    });
};

/**
 * get a token.
 *
 * @desc get a token with the given id from db
 *
 * @param {Object} query  Query object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting token ', query);

  Token
    .findOne(query, returnFields)
    .populate(population)
    .exec(function getToken(err, token) {
      if(err) {
        return cb(err);
      }

      cb(null, token);

  });
};

/**
 * get a collection of tokens
 *
 * @desc get a collection of tokens from db
 *
 * @param {Object} query Query object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, qs, cb) {
  debug('fetching a collection of tokens ', query);

  Token
    .find(query, returnFields)
    .populate(population)
    .exec(function (err, tokens) {
      if(err) {
        return cb(err);
      }

      cb(null, tokens);
    });

};
