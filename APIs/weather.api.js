const request = require('postman-request')

function forecast(address, callback) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${address}&appid=${process.env.OWM_ACCESS_TOKEN}`
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', null)
        } else if (response.error) {
            callback('Unable to find location.', null)
        } else {
            callback(null, response)
        }
    })
}

module.exports = forecast