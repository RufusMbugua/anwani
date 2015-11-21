/**
 * log router.
 *
 * @summary
 *  log.create()
 *  log.update()
 *  log.delete()
 *  log.fetchOne()
 *  log.fetchAll()
 */

/**
 * Load Module Dependencies.
 */
var express  = require('express');
var debug    = require('debug')('anwani-api:log-router');

var logController = require('../controllers/log');
var accessControl     = require('../controllers/auth').accessControl;

var router  = express.Router();

/**
 * @api {get} /logs/search?<QUERY_TYPE>=<QUERY_VALUE> Search for logs
 * @apiVersion 1.0.0
 * @apiName Search
 * @apiGroup log
 *
 * @apiDescription Search for logs. The types can be mixed and matched i.e `/logs/search?solved=true&source=android`
 * The following list contains list query types that can be used:
 * - source: android|web|api
 * - type: bug|error|crash|activity
 * - solved: true|false
 * - start_date: ISO_FORMATTED_DATE("'2015-11-06T11:34:06.929Z'")
 *
 * @apiSuccess {String} _id log id
 * @apiSuccess {Boolean} solved solved
 * @apiSuccess {String} source log source
 * @apiSuccess {String} type log type
 * @apiSuccess {Object} info log info
 *
 * @apiSuccessExample Response Example:
 *  [{
 *    "_id" : "556e1174a8952c9521286a60",
 *    "source": "android",
 *    "type": "bug",
 *    "info": {...}
 *  }]
 *
 */
router.get('/search', accessControl(['*']), logController.search);

/**
 * @api {post} /logs/create Create Log
 * @apiVersion 1.0.0
 * @apiName CreateNew
 * @apiGroup log
 *
 * @apiDescription Create an Log.
 *
 * @apiParam {String} source log source
 * @apiParam {String} type log type
 * @apiParam {Object} info log info
 *
 * @apiParamExample Request Example
 * {
 *       "source": "android",
 *       "type": "bug",
 *       "info": {...}
 * }
 *
 * @apiSuccess {String} _id log id
 * @apiSuccess {Boolean} solved solved
 * @apiSuccess {String} source log source
 * @apiSuccess {String} type log type
 * @apiSuccess {Object} info log info
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "_id" : "556e1174a8952c9521286a60",
 *    "source": "android",
 *    "type": "bug",
 *    "info": {...}
 *  }
 *
 */
router.post('/create', logController.create);


/**
 * @api {get} /logs/:id Get log
 * @apiVersion 1.0.0
 * @apiName Get
 * @apiGroup log
 *
 * @apiDescription Get a log with the given id
 *
 * @apiSuccess {String} _id log id
 * @apiSuccess {Boolean} solved solved
 * @apiSuccess {String} source log source
 * @apiSuccess {String} type log type
 * @apiSuccess {Object} info log info
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "_id" : "556e1174a8952c9521286a60",
 *    "source": "android",
 *    "type": "bug",
 *    "info": {...}
 *  }
 */
router.get('/:id', accessControl(['admin']), logController.fetchOne);

/**
 * @api {put} /logs/:id Update log
 * @apiVersion 1.0.0
 * @apiName Update
 * @apiGroup log
 *
 * @apiDescription Update a log with the given id
 *
 * @apiSuccess {String} _id log id
 * @apiSuccess {Boolean} solved solved
 * @apiSuccess {String} source log source
 * @apiSuccess {String} type log type
 * @apiSuccess {Object} info log info
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "_id" : "556e1174a8952c9521286a60",
 *    "source": "android",
 *    "type": "bug",
 *    "info": {...}
 *  }
 */
router.put('/:id', accessControl(['admin']), logController.update);

/**
 * @api {get} /logs?page=<RESULTS_PAGE>&per_page=<RESULTS_PER_PAGE> Get logs collection
 * @apiVersion 1.0.0
 * @apiName FetchAll
 * @apiGroup log
 *
 * @apiDescription Get a collection of logs. The endpoint has pagination
 * out of the box. Use these params to query with pagination: `page=<RESULTS_PAGE`
 * and `per_page=<RESULTS_PER_PAGE>`.
 *
 * @apiSuccess {String} _id log id
 * @apiSuccess {Boolean} solved solved
 * @apiSuccess {String} source log source
 * @apiSuccess {String} type log type
 * @apiSuccess {Object} info log info
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "total_pages": 1,
 *    "total_docs_count": 0,
 *    "docs": [{
 *       "_id" : "556e1174a8952c9521286a60",
 *       "solved": true,
 *       "source": "android",
 *       "type": "bug",
 *       "info": {...}
 *    }]
 *  }
 *
 */
router.get('/', accessControl(['admin']), logController.fetchAll);

// Expose log Router
module.exports = router;
