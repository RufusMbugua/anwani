var hash = require('../lib/utils').hashSecurityAnswer;

hash('answer', function (err, hashed) {
  console.log(err, hashed);
});
