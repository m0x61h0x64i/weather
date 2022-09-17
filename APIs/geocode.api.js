const request = require('postman-request')

function geocode (address, callback) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.GEOCODE_ACCESS_TOKEN}`
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', null)
        } else if (body.features.length === 0) {
            callback('Unable to find location.', null)
        } else {
            callback(null, `latitude = ${body.features[0].center[1]} & longtitude = ${body.features[0].center[0]}`)
        }
    })
} 

module.exports = geocode