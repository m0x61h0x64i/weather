const request = require('postman-request')

function geocode (address, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFzam8iLCJhIjoiY2w1bDIzZTJ2MGZrbDNwbm1tcGlnOTlsZSJ9.hK59gX_I-kWv4ssdvNw2gA'
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, `latitude = ${body.features[0].center[1]} & longtitude = ${body.features[0].center[0]}`)
        }
    })
} 

module.exports = geocode