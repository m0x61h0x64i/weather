const request = require('postman-request')

function forecast(address, callback) {
    const url = 'http://api.weatherstack.com/current?access_key=9b427e0d426c87abf812d9ca5dd3391d&query=' + address
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`, body.location.localtime.slice(-5), body.current.temperature, body.current.weather_icons[0])
        }
    })
}

module.exports = forecast