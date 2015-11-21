/** *
 * Load Module Dependencies.
 */
var EventEmitter = require('events').EventEmitter;
var crypto  = require('crypto');
var fs = require('fs');

var debug      = require('debug')('anwani-api:subscriber-controller');
var async      = require('async');
var moment     = require('moment');
var _          = require('lodash');
var nodemailer = require('nodemailer');

var Subscriber      = require('../dal/subscriber');
var Token           = require('../dal/token');
var SubscriberModel = require('../models/subscriber');
var config          = require('../config');
var CustomError     = require('../lib/custom-error');


var emailTemplate = fs.readFileSync('./config/email_template.html').toString();
var transport = nodemailer.createTransport({
  service: config.SMTP.SERVICE,
  auth: {
    user: config.SMTP.USER,
    pass: config.SMTP.PASS
  }
});

/**
 * Create a verification token
 */
function createVerificationToken() {
  try {
    var bytes  = crypto.randomBytes(config.VERIFICATION.TOKEN_LENGTH);

    return bytes.toString('hex');
  } catch(ex) {
    createVerificationToken();
  }
}

/**
 * Create a subscriber.
 *
 * @desc create a subscriber and add them to the database
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.create = function createSubscriber(req, res, next) {
  debug('create subscriber');

  // Begin workflow
  var workflow = new EventEmitter();
  var body = req.body;

  // validating subscriber data
  // cant trust anyone
  workflow.on('validate', function validateSubscriber() {
    req.assert('email', 'Email is required').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password is required').notEmpty();
    req.assert('name', 'Subscriber Name is required').notEmpty();

    var errs = req.validationErrors();

    if(errs) {
      return next(CustomError({
        name: 'SUBSCRIBER_CREATION_ERROR',
        message: errs.message
      }));
    }

    workflow.emit('createSubscriber');
  });

  workflow.on('createSubscriber', function createSubscriber() {
    var verificationLink;


    body.verification_token = createVerificationToken();

    verificationLink  = config.API_URL + '/subscribers/verify/' + body.verification_token;

    body.verification_link = verificationLink;
    body.verified = true;

    Subscriber.create(body, function (err, subscriber) {
      if(err) {
        return next(CustomError({
          name: 'SUBSCRIBER_CREATION_ERROR',
          message: err.message
        }));
      }

      //workflow.emit('sendEmail', subscriber);
      workflow.emit('completeRegistration', subscriber);

    });


  });

  workflow.on('sendEmail', function (subscriber) {
    var logoUrl;
    var emailBody;
    var mailOptions;

    logoUrl           = config.API_URL + '/assets/anwani_logo.png';
    emailBody = emailTemplate
                .replace('{{name}}', subscriber.name)
                .replace(/\{\{verification_url\}\}/g, body.verification_link)
                .replace('{{logo_url}}', logoUrl);
    mailOptions = {
      from: 'Anwani Team ✔ <tonimut7@gmail.com>',
      to: subscriber.email,
      subject: 'Email Verification ✔', // Subject line
      html: emailBody
    };

    transport.sendMail(mailOptions, function (err, response) {
      if(err) {
        return next(CustomError({
          name: 'SUBSCRIBER_CREATION_ERROR',
          message: err.message
        }));
      }

      workflow.emit('completeRegistration', subscriber);
    });
  });

  workflow.on('completeRegistration', function (subscriber) {
    var fields = ['_id', 'name', 'email', 'website', 'date_created', 'logo'];

    res.status(201).json(_.pick(subscriber, fields));
  });

  workflow.emit('validate');
};

/**
 * Get a single subscriber.
 *
 * @desc Fetch a subscriber with the given id from the database.
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.fetchOne = function fetchOneSubscriber(req, res, next) {
  debug('fetch subscriber:' + req.params.id);

  var query = {
    _id: req.params.id
  };

  Subscriber.get(query, function cb(err, subscriber) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }

    res.json(subscriber);
  });
};

/**
 * Update a single subscriber.
 *
 * @desc Fetch a subscriber with the given id from the database
 *       and update their data
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.update = function updateSubscriber(req, res, next) {
  debug('updating subscriber:'+ req.params.id);

  var query = {
    _id: req.params.id
  };
  var body = req.body;
  var update;

  if(body.password) {
    return next(CustomError({
      name: 'SUBSCRIBER_UPDATE_ERROR',
      message: 'Please use /subscribers/:id/password to update passwords instead'
    }));
  }

  update = {
    $set: body
  };

  Subscriber.update(query, update, function cb(err, subscriber) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }

    res.json(subscriber || {});

  });

};

/**
 * Delete/Archive a single subscriber.
 *
 * @desc Fetch a subscriber with the given id from the database
 *       and delete their data
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.delete = function deleteSubscriber(req, res, next) {
  debug('deleting subscriber:' + req.params.id);

  var query = {
    _id: req.params.id
  };

  var update = {
    $set: { archived: true, addresses: [] }
  };
  var subscriber  = req._user;
  var now   = moment().toISOString();
  var tokenQuery = {
    subscriber: subscriber._id
  };
  var tokenUpdates = {
    $set: {
      value: 'EMPTY',
      revoked: true
    }
  };

  Subscriber.update(query, update, function cb(err, subscriber) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }


    Token.update(tokenQuery, tokenUpdates, function(err, token) {
      if(err) {
        return next(CustomError({
          name: 'SERVER_ERROR',
          message: err.message,
          status: 500
        }));
      }

      res.json(subscriber);
    });

  });

};

/**
 * Get a collection of subscribers
 *
 * @desc Fetch a collection of subscribers
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.fetchAll = function fetchAllsubscribers(req, res, next) {
  debug('get a collection of subscribers');

  var page   = req.query.page || 1;
  var limit  = req.query.per_page || 10;

  var opts = {
    page: page,
    limit: limit,
    sort: { }
  };
  var query = {};

  Subscriber.getCollection(query, opts, function cb(err, subscribers) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }

    res.json(subscribers);
  });
};

/**
 * Configure subscription for a subscriber
 *
 * @desc
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.updateSubscription = function updateSubscription(req, res, next) {
  debug('Config subscription for ' + req.params.id);

  var qs = req.query;
  var isCorrect = qs.config ?
        ((qs.config === 'enable') || (qs.config === 'disable')) : false;

  if(!qs.config || !isCorrect) {
    return next(CustomError({
      name: 'SUBSCRIPTION_CONFIG_ERROR',
      message: 'Please provide querystring config value either enable or disable'
    }));
  }

  var type = query.config;
  var id = req.params.id;
  var query = {
    _id: id
  };
  var update  = {
    subscription_on: (type === 'enable' ? true : false)
  };

  Subscriber.update(query, update, function cb(err, subscriber) {
    if(err) {
      return next(CustomError({
        name: 'SUBSCRIPTION_CONFIG_ERROR',
        message: err.message
      }));
    }

    if(!subscriber._id) {
      return next(CustomError({
        name: 'SUBSCRIPTION_CONFIG_ERROR',
        message: 'Id(' + id + ') is not recognized'
      }));
    }

    var data = {
      subscriber: subscriber._id,
      subscription: type === 'enable' ? 'enabled' : 'disabled'
    };

    res.json(data);
  });
};


/**
 * Update the logo of a subscriber
 *
 * @desc
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.updateLogo = function updateLogo(req, res, next) {
  debug('updating subscriber logo:'+ req.params.id);

  var body = req.body;
  var update = {
    $set: {
      logo: body.logo
    }
  };
  var query = {
    _id: req.params.id
  };

  Subscriber.update(query, update, function cb(err, subscriber) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }

    if(!subscriber._id) {
      return next(CustomError({
        name: 'LOGO_UPDATE_ERROR',
        message: 'Id(' + id + ') is not recognized'
      }));
    }

    res.json({ logo: subscriber.logo});

  });

};


/**
 * Update the password of a subscriber
 *
 * @desc
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.updatePassword = function updatePassword(req, res, next) {
  debug('updating password for ' + req._user._id);

  var body = req.body;
  var query = {
    _id: req._user._id
  };

  if(!body.new_password && !body.old_password) {
    return next(CustomError({
      name: 'PASSWORD_UPDATE_ERROR',
      message: 'Please provide old and new password'
    }));
  }


  async.waterfall([
    function findSubscriber(done) {
      SubscriberModel.findOne(query, function (err, subscriber) {
        if(err) {
          return done(CustomError({
            name: 'SERVER_ERROR',
            message: err.message,
            status: 500
          }));
        }

        if(!subscriber._id) {
          return done(CustomError({
            name: 'PASSWORD_UPDATE_ERROR',
            message: 'Id(' + id + ') is not recognized'
          }));

        }

        done(null, subscriber);
      });
    },
    function verifyPassword(subscriber, done) {
      subscriber.verifyPassword(body.old_password, function (err, isMatch) {
        if(err) {
          return done(CustomError({
            name: 'SERVER_ERROR',
            message: err.message,
            status: 500
          }));
        }

        if(!isMatch) {
          return done(CustomError({
            name: 'PASSWORD_UPDATE_ERROR',
            message: 'Password provided is invalid'
          }));
        }

        done(null, subscriber);

      });
    },
    function hasNewPassword(subscriber, done) {
      Subscriber.hashPasswd(body.new_password, function (err, hash) {
        if(err) {
          return done(CustomError({
            name: 'SERVER_ERROR',
            message: err.message,
            status: 500
          }));
        }

        var update = {
          $set: {
            password: hash
          }
        };

        done(null, update);
      });
    },
    function updateSubscriberPassword(update, done) {
      Subscriber.update(query, update, function cb(err, subscriber) {
        if(err) {
          return done(CustomError({
            name: 'SERVER_ERROR',
            message: err.message,
            status: 500
          }));
        }

        if(!subscriber._id) {
          return done(CustomError({
            name: 'PASSWORD_UPDATE_ERROR',
            message: 'Id(' + id + ') is not recognized'
          }));
        }


        done(null, { updated: true });

      });
    }
  ], function (err, results) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }

    res.json(results);

  });
};

/**
 * Update the subscriber Subscription plan
 *
 * @desc
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.updateSubscriptionPlan = function updateSubscriptionPlan(req, res, next) {
  debug('updating subscriber subscription plan:'+ req.params.id);

  var body = req.body;
  var update = {
    $set: {
      subscription_plan: body.plan
    }
  };
  var query = {
    _id: req.params.id
  };

  Subscriber.update(query, update, function cb(err, subscriber) {
    if(err) {
      return next(CustomError({
        name: 'SERVER_ERROR',
        message: err.message,
        status: 500
      }));
    }

    if(!subscriber._id) {
      return next(CustomError({
        name: 'SUBSCRIPTION_PLAN_UPDATE_ERROR',
        message: 'Id(' + id + ') is not recognized'
      }));
    }

    res.json({ updated: true });

  });

};
