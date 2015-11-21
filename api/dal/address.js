// Access Layer for Address Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('anwani-api:dal-address');
var moment  = require('moment');
var _       = require('lodash');

var Address = require('../models/address');
var User  = require('../models/user');

var returnFields = Address.whitelist;
var population = [{
  path: 'user',
  select: User.whitelist
}];

/**
 * create a new address.
 *
 * @desc  creates a new address and saves them
 *        in the database
 *
 * @param {Object}  addressData  Data for the address to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(addressData, cb) {
  debug('creating a new address');

  var searchQuery = {
    longitude : addressData.longitude,
    latitude  : addressData.latitude,
    user:   addressData.user
  };

  Address.findOne(searchQuery, function (err, isMatch) {
    if(err) {
      return cb(err);
    }

    if(isMatch) {
      return exports.get({ _id: isMatch._id }, function(err, address) {
        if(err) {
          return cb(err);
        }

        return cb(null, { isNew: false, address: address });
      });
    }

    // Create address if is new.
    var addressModel  = new Address(addressData);

    addressModel.save(function saveAddress(err, data) {
      if (err) {
        return cb(err);
      }

      exports.get({ _id: data._id }, function(err, address) {
        if(err) {
          return cb(err);
        }
        return cb(null, { isNew: true , address: address });
      });

    });
  });


};

/**
 * delete a address
 *
 * @desc  delete data of the address with the given
 *        id
 *
 * @param {Object} query  Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting address: ', query);

  Address
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteAddress(err, address) {
      if (err) {
        return cb(err);
      }

      if(!address) {
        return cb(null, {});
      }

      address.remove(function(err) {
        if(err) { return cb(err); }

        cb(null, address || {});
      });

  });
};

/**
 * update a address
 *
 * @desc  update data of the address with the given
 *        id
 *
 * @param {Object} query  Query Object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating address: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true,
    select: returnFields
  };

  updates.$set = updates.$set || {};

  updates.$set.last_modified = now;

  Address
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateAddress(err, address) {
      if(err) {
        return cb(err);
      }

      cb(null, address || {});
    });
};

/**
 * get a address.
 *
 * @desc get a address with the given id from db
 *
 * @param {Object} query  Query object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting address ', query);

  Address
    .findOne(query, returnFields)
    .populate(population)
    .exec(function getAddress(err, address) {
      if(err) {
        return cb(err);
      }

      cb(null, address || {});

  });
};

/**
 * get a collection of addresses
 *
 * @desc get a collection of addresses from db
 *
 * @param {Object} query Query object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, qs, cb) {
  debug('fetching a collection of addresses ', query);

  var opts = {
    columns:  returnFields,
    sortBy:   qs.sort || {},
    populate: population,
    page:     qs.page,
    limit:    qs.limit
  };


  Address.paginate(query, opts, function (err, docs, page, count) {
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

exports.getUsersCollection = function getUsersCollection(id, service, cb) {
  var query = {
    user:     id,
    archived: false
  };

  if(service === 'mobile') {
    Address
      .find(query, returnFields)
      .exec(function (err, addresses) {
        if(err) {
          return cb(err);
        }

        cb(null, addresses);
      });
      return;
  } else {
    Address
      .find(query, returnFields)
      .populate(population)
      .exec(function (err, addresses) {
        if(err) {
          return cb(err);
        }

        cb(null, addresses);
      });
      return;
  }
};
