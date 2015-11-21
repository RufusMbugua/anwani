/**
 * Load Module Dependencies
 */
var crypto = require('crypto');

var config = require('../config');

/**
 * Hash Security Answer
 */
exports.hashSecurityAnswer = function hashSecurityAnswer(answer, cb) {
  var salt = config.SECURITY_ANSWER_SALT;
  var iterations = 512;
  var keyLen = 48;
  var digest = 'sha256';

  crypto.pbkdf2(answer, salt, iterations, keyLen, digest, function (err, key) {
    if(err) {
      return cb(err);
    }

    cb(null, key.toString('base64'));
  });
};
