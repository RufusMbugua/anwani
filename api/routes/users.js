/**
 * User router.
 *
 * @summary
 *  user.create()
 *  user.update()
 *  user.delete()
 *  user.fetchOne()
 *  user.fetchAll()
 */

/**
 * Load Module Dependencies.
 */
var express  = require('express');
var debug    = require('debug')('anwani-api:user-router');

var userController  = require('../controllers/user');
var authController  = require('../controllers/auth');
var accessControl        = require('../controllers/auth').accessControl;

var router  = express.Router();

/**
 * @api {post} /users/signup Create a user
 * @apiVersion 1.0.0
 * @apiName Signup
 * @apiGroup User
 *
 * @apiDescription Create a new user
 *
 * @apiParam {String} phone_number Phone number
 * @apiParam {String} password Password/Pin
 * @apiParam {String} first_name first name
 * @apiParam {String} last_name last name
 * @apiParam {String} other_name other names
 * @apiParam {Object} security_pass security question and answer
 * @apiParam {String} security_pass.question security question
 * @apiParam {Object} security_pass.answer security answer
 *
 * @apiParamExample Request Example:
 *  {
 *    "phone_number": "254711223344",
 *    "password": "pin",
 *    "last_name": "smith",
 *    "first_name": "john",
 *    "other_name": "cole",
 *    "security_pass": {
 *      "question": "what was your first ever nickname",
 *      "answer": "none"
 *    }
 *  }
 *
 * @apiSuccess {String} _id user id
 * @apiSuccess {String} first_name first name
 * @apiSuccess {String} last_name last name
 * @apiSuccess {String} other_name other names
 * @apiSuccess {Array}  addresses addresses
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "_id" : "556e1174a8952c9521286a60",
 *    "last_name": "smith",
 *    "first_name": "john",
 *    "other_name": "cole",
 *    "addresses" : []
 *  }
 *
 */
router.post('/signup', userController.create);

/**
 * @api {post} /users/login Login a user
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup User
 *
 * @apiDescription Log in a user. The request returns a token used to authentication
 * of the user on subsequent requests. The token is placed as an HTTP header ie
 * ```Authorization: Bearer <Token-here>``` otherwise requests are rejected.
 *
 * @apiParam {String} username user phoner number
 * @apiParam {String} password Password/Pin
 *
 * @apiParamExample Request Example:
 *  {
 *    "phone_number": "245757565",
 *    "password": "mypin"
 *  }
 *
 * @apiSuccess {String} token auth token
 * @apiSuccess {Object} user user info
 * @apiSuccess {String} user._id user id
 * @apiSuccess {String} user.first_name first name
 * @apiSuccess {String} user.last_name last name
 * @apiSuccess {String} user.other_name other names
 * @apiSuccess {String} user.phone_number phone number
 * @apiSuccess {Array} user.addresses addresses
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "token" : "ylHUMaVrS0dpcO/+nT+6aAVVGcRJzu=",
 *    "user": {
 *      "_id" : "556e1174a8952c9521286a60",
 *      "last_name": "smith",
 *      "first_name": "john",
 *      "other_name": "cole",
 *      "phone_number": "254711223344",
 *      "addresses" : []
 *    }
 *  }
 *
 */
router.post('/login', authController.login);

/**
 * @api {post} /users/logout Logout a user
 * @apiVersion 1.0.0
 * @apiName Logout
 * @apiGroup User
 *
 * @apiDescription Invalidate a users token
 *
 * @apiSuccess {Boolean} logged_out message
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "logged_out" : true
 *  }
 *
 */
router.post('/logout', authController.logout);


/**
 * @api {get} /users/:id Get User
 * @apiVersion 1.0.0
 * @apiName Get
 * @apiGroup User
 *
 * @apiDescription Get a user with the given id
 *
 * @apiSuccess {String} _id user id
 * @apiSuccess {String} first_name first name
 * @apiSuccess {String} last_name last name
 * @apiSuccess {String} other_name other names
 * @apiSuccess {Array} addresses addresses
 * @apiSuccess {String} phone_number phone number
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "_id" : "556e1174a8952c9521286a60",
 *    "last_name": "smith",
 *    "first_name": "john",
 *    "other_name": "cole",
 *    "phone_number": "254711223344",
 *    "addresses" : []
 *  }
 */
router.get('/:id', accessControl(['consumer', 'admin']), userController.fetchOne);

/**
 * @api {put} /users/:id Update User
 * @apiVersion 1.0.0
 * @apiName Update
 * @apiGroup User
 *
 * @apiDescription Update a user with the given id
 *
 * @apiSuccess {String} _id user id
 * @apiSuccess {String} first_name first name
 * @apiSuccess {String} last_name last name
 * @apiSuccess {String} other_name other names
 * @apiSuccess {Array} addresses addresses
 * @apiSuccess {String} phone_number phone number
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "_id" : "556e1174a8952c9521286a60",
 *    "last_name": "smith",
 *    "first_name": "john",
 *    "other_name": "cole",
 *    "phone_number": "254711223344",
 *    "addresses" : []
 *  }
 */
router.put('/:id', accessControl(['consumer', 'admin']), userController.update);

/**
 * @api {get} /users?page=<RESULTS_PAGE>&per_page=<RESULTS_PER_PAGE> Get users collection
 * @apiVersion 1.0.0
 * @apiName FetchAll
 * @apiGroup User
 *
 * @apiDescription Get a collection of users. The endpoint has pagination
 * out of the box. Use these params to query with pagination: `page=<RESULTS_PAGE`
 * and `per_page=<RESULTS_PER_PAGE>`.
 *
 * @apiSuccess {String} _id user id
 * @apiSuccess {String} first_name first name
 * @apiSuccess {String} last_name last name
 * @apiSuccess {String} other_name other names
 * @apiSuccess {Array} addresses addresses
 * @apiSuccess {String} phone_number phone number
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "total_pages": 1,
 *    "total_docs_count": 0,
 *    "docs": [{
 *      "_id" : "556e1174a8952c9521286a60",
 *      "last_name": "smith",
 *      "first_name": "john",
 *      "other_name": "cole",
 *      "phone_number": "254711223344",
 *      "addresses" : []
 *    }]
 *  }
 */
router.get('/', accessControl(['admin']), userController.fetchAll);

/**
 * @api {delete} /users/:id Delete User
 * @apiVersion 1.0.0
 * @apiName Delete
 * @apiGroup User
 *
 * @apiDescription Delete a user with the given id
 *
 * @apiSuccess {String} _id user id
 * @apiSuccess {String} first_name first name
 * @apiSuccess {String} last_name last name
 * @apiSuccess {String} other_name other names
 * @apiSuccess {Array} addresses addresses
 * @apiSuccess {String} phone_number phone number
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "_id" : "556e1174a8952c9521286a60",
 *    "last_name": "smith",
 *    "first_name": "john",
 *    "other_name": "cole",
 *    "phone_number": "254711223344",
 *    "addresses" : []
 *  }
 *
 */
router.delete('/:id', accessControl(['consumer', 'admin']), userController.delete);

/**
 * @api {get} /users/:id/addresses Get user's address collection
 * @apiVersion 1.0.0
 * @apiName FetchUserAddresses
 * @apiGroup User
 *
 * @apiDescription Get a collection of user's addresses
 *
 * @apiSuccess {String} _id address id
 * @apiSuccess {String} virtual_code virtual code
 * @apiSuccess {String} location_pic location photo
 * @apiSuccess {Number} latitude latitude coordinate
 * @apiSuccess {Number} longitude longitude coordinate
 * @apiSuccess {String} street_address street address
 * @apiSuccess {String} city city name
 * @apiSuccess {String} country country name
 *
 * @apiSuccessExample Response Example:
 *  [{
 *    "_id" : "556e1174a8952c9521286a60",
 *    user: "556e1174a8952c9521286a60",
 *    short_plus_code: "MP7H+E2",
 *    long_plus_code: "6E9AEFMP7H+E2FH",
 *    virtual_code: "BB35E24B",
 *    location_pic: "/media/a8952c9521286a60.jpeg",
 *    latitude: 4.567889,
 *    longitude: -12.098,
 *    street_address: "",
 *    city: "nairobi",
 *    country: "kenya"
 *  }]
 *
 */
router.get('/:id/addresses', accessControl(['consumer', 'admin']), userController.fetchUserAddresses);

/**
 * @api {put} /users/password/update Update user password/pin
 * @apiVersion 1.0.0
 * @apiName UpdatePassword
 * @apiGroup User
 *
 * @apiDescription Update password of a given user.
 *
 * @apiParam {String} security_answer security question answer
 * @apiParam {String} security_question security question
 * @apiParam {String} phone_number phone number
 * @apiParam {String} new_password new password/pin
 *
 * @apiParamExample Request Example:
 * {
 *    "security_question": "What was you first ever nickname",
 *    "security_answer" : "john doey",
 *    "phone_number" : "0713510521"
 *    "new_password": "2654"
 * }
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "updated": true
 *  }
 */
router.post('/password/update', userController.updatePassword);


// Expose User Router
module.exports = router;
