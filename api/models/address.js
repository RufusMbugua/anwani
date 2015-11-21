// Address Model Definiton.

/**
 * Load Module Dependencies.
 */
var mongoose  = require('mongoose');
var moment    = require('moment');
var paginator = require('mongoose-paginate');

var Schema = mongoose.Schema;
var tempLocationPic = 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png';

var AddressSchema = new Schema({
  user:           { type: Schema.Types.ObjectId, ref: 'User' },
  short_plus_code:    { type: String },
  long_plus_code:     { type: String },
  virtual_code:       { type: String },
  location_pic:   { type: String , default: tempLocationPic },
  latitude:       { type: Number },
  longitude:      { type: Number },
  street_address: { type: String },
  city:           { type: String },
  country:        { type: String },
  archived:       { type: Boolean, default: false },
  shared:         { type: Boolean, default: false },
  date_created:   Date,
  last_modified:  Date
});

// add mongoose-troop middleware to support pagination
AddressSchema.plugin(paginator);

/**
 * Pre save middleware.
 *
 * @desc  - Sets the date_created and last_modified
 *          attributes prior to save.
 *        - Hash tokens password.
 */
AddressSchema.pre('save', function preSaveMiddleware(next) {
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
AddressSchema.statics.whitelist = {
  _id: 1,
  short_plus_code:   1,
  long_plus_code:   1,
  location_pic:   1,
  latitude:       1,
  longitude:      1,
  street_address: 1,
  city:           1,
  country:        1,
  user:           1,
  archived:       1,
  date_created:   1,
  shared:         1,
  virtual_code: 1
};


// Expose Address model
module.exports = mongoose.model('Address', AddressSchema);
