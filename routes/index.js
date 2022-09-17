const router = require('express').Router()
const getWeather = require('../controllers')

router.get('/weather', getWeather)

module.exports = router