const axios = require('axios')

const forecast = async(address, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${address}&appid=${process.env.OWM_ACCESS_TOKEN}`
    try {
        const response = await axios(url)
        callback(null, response)
    } catch (error) {
        callback(error, null)
    }
}

module.exports = forecast