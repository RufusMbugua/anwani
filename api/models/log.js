// Log Model Definiton.

/**
 * Load Module Dependencies.
 */
var mongoose  = require('mongoose');
var moment    = require('moment');
var paginator = require('mongoose-paginate');

var Schema = mongoose.Schema;

var LogSchema = new Schema({
  source:         { type: String },
  type:           { type: String },
  info:           { type: Object },
  solved:         { type: Boolean, default: false },
  date_created:   Date,
  last_modified:  Date
});

// add mongoose-troop middleware to support pagination
LogSchema.plugin(paginator);

/**
 * Pre save middleware.
 *
 * @desc  - Sets the date_created and last_modified
 *          attributes prior to save.
 *        - Hash tokens password.
 */
LogSchema.pre('save', function preSaveMiddleware(next) {
  var token = this;

  // set date modifications
  var now = moment().toISOString();

  token.date_created = now;
  token.last_modified = now;

  next();

});

/**
 * Model Attributes to expose
 */
LogSchema.statics.whitelist = {
  _id: 1,
  source: 1,
  type: 1,
  info: 1,
  solved: 1,
  date_created: 1
};

// Expose Log model
module.exports = mongoose.model('Log', LogSchema);
