/**
 * User Model Definition.
 */

/**
 * Load Module Dependencies.
 */
var mongoose  = require('mongoose');
var moment    = require('moment');
var paginator = require('mongoose-paginate');
var bcrypt    = require('bcrypt');

var config    = require('../config');
var hashSecurityAnswer = require('../lib/utils').hashSecurityAnswer;

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name:   { type: String },
  last_name:    { type: String },
  other_name:   { type: String },
  password:     { type: String },
  last_login:   { type: Date },
  realm:        { type: String, default: 'user' },
  role:         { type: String, default: 'consumer' },
  email:        { type: String  },
  archived:     { type: Boolean, default: false },
  phone_number: { type: String, unique: true },
  security_pass: {
    question: { type: String },
    answer:   { type: String }
  },
  addresses:    [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  date_created: Date,
  last_modified:Date
});

/**
 * Model attributes to expose
 */
UserSchema.statics.whitelist = {
  _id: 1,
  phone_number: 1,
  first_name: 1,
  last_name: 1,
  other_name: 1,
  last_login: 1,
  addresses: 1,
  role:   1,
  email: 1
};

// add mongoose-troop middleware to support pagination
UserSchema.plugin(paginator);

/**
 * Verify the submitted password and the stored one
 *
 * @param {String} password submitted password
 * @param {Function} cb Callback function
 */
UserSchema.methods.verifyPassword = function verifyPassword(passwd, cb) {
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
UserSchema.pre('save', function preSave(next) {
  var model = this;

  // Hash Password
  UserSchema.statics.hashPasswd(model.password, function(err, hash) {
    if(err) {
      return next(err);
    }

    // set date modifications
    var now = moment().toISOString();

    model.password = hash;

    model.date_created = now;
    model.last_modified = now;

    // Hash Security question
    hashSecurityAnswer(model.security_pass.answer, function (err, hashed) {
      if(err) {
        return next(err);
      }

      model.security_pass.answer = hashed;

      next();
    });

  });

});

UserSchema.statics.hashPasswd = function (passwd, cb) {
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

// Expose the User Model
module.exports = mongoose.model('User', UserSchema);
