/**
 * Load Module Dependencies
 */

function CustomError(info) {
  if(!(this instanceof CustomError)) {
    return new CustomError(info);
  }

  this.name = info.name || 'CUSTOM_ERROR';
  this.message = info.message || 'an error occurred';
  this.status = info.status || 400;
}

CustomError.prototype = Object.create(Error.prototype);

CustomError.prototype.constructor = CustomError;

module.exports = CustomError;
