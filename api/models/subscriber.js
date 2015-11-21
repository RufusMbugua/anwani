/**
 * Subscriber Model Definition.
 */

/**
 * Load Module Dependencies.
 */
var mongoose  = require('mongoose');
var moment    = require('moment');
var paginator = require('mongoose-paginate');
var bcrypt    = require('bcrypt');

var config    = require('../config');

var Schema = mongoose.Schema;

var SubscriberSchema = new Schema({
  name:         { type: String },
  address:      { type: String },
  website:      { type: String },
  logo:         { type: String },
  password:     { type: String },
  last_login:   { type: Date },
  phone_number: { type: String,  },
  email:        { type: String,  },
  realm:        { type: String,   default: 'user' },
  role:         { type: String,   default: 'subscriber' },
  archived:     { type: Boolean,  default: false },
  verified:     { type: Boolean,  default: false },
  verification_token: { type: String },
  verification_link:  { type: String },
  subscription_plan:  { type: String,   default: 'basic' },
  subscription_on:    { type: Boolean,  default: false },
  date_created:       { type: Date },
  last_modified:      { type: Date }
});

/**
 * Model attributes to expose
 */
SubscriberSchema.statics.whitelist = {
  _id: 1,
  phone_number: 1,
  last_login: 1,
  address: 1,
  name: 1,
  email: 1,
  logo: 1,
  website: 1,
  verified: 1,
  subscription_plan: 1,
  subscription_on: 1,
  role: 1,
  date_created: 1
};

// add mongoose-troop middleware to support pagination
SubscriberSchema.plugin(paginator);

/**
 * Verify the submitted password and the stored one
 *
 * @param {String} password submitted password
 * @param {Function} cb Callback function
 */
SubscriberSchema.methods.verifyPassword = function verifyPassword(passwd, cb) {
  bcrypt.compare(passwd, this.password, function done(err, isMatch) {
    if(err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

/**
 * Pre save middleware.
 *
 * Sets the date_created and last_modified attributes prior to save
 */
SubscriberSchema.pre('save', function preSave(next) {
  var model = this;

  SubscriberSchema.statics.hashPasswd(model.password, function(err, hash) {
    if(err) {
      return next(err);
    }

    // set date modifications
    var now = moment().toISOString();

    model.password = hash;

    model.date_created = now;
    model.last_modified = now;

    next();
  });

});

SubscriberSchema.statics.hashPasswd = function (passwd, cb) {
  // Generate a salt factor
  bcrypt.genSalt(config.SALT_FACTOR, function genSalt(err, salt) {
    if(err) {
      return cb(err);
    }

    // Hash the password using the generated salt
    bcrypt.hash(passwd, salt, function hashPassword(err, hash) {
      if(err) {
        return cb(err);
      }

      cb(null, hash);

    });

  });
};

// Expose the Subscriber Model
module.exports = mongoose.model('Subscriber', SubscriberSchema);
