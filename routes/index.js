const router = require('express').Router()
const getWeather = require('../controllers')

/**
 * @swagger
 * 
 * name: Wather
 * description: Weather management.
 */

/**
 * @swagger
 * 
 * /weather:
 *  get:
 *      summary: get next 7 days forecast
 *      tags:
 *          - Weather
 *      parameters:
 *          - name: input
 *            description: the city | country | state of the user\'s input
 *            in: query
 *            required: true
 *            schema:
 *                  type: string
 *                  example: tehran
 *      responses:
 *          400:
 *              description: validation errors
 *          503:
 *              description: service errors
 *          200:
 *              description: OK
 */

router.get('/weather', getWeather)

module.exports = router