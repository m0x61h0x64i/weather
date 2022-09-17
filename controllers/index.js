const { Country, City, State } = require('country-state-city')
const forecast = require('../APIs/weather.api')
const geocode = require('../APIs/geocode.api')

const getWeather = (req, res) => {

    if (!req.query.input) {
        return res.status(400).send({ message: 'Your request is not valid!' })
    }

    if (req.query.input) {
        const userCity = City.getAllCities().filter((item) => {
            return item.name.toLowerCase().replace(/\s/g, '') === req.query.input
        })
        
        const userCountry = Country.getAllCountries().filter((item) => {
            return item.name.toLowerCase().replace(/\s/g, '') === req.query.input
        })

        const userState = State.getAllStates().filter((item) => {
            return item.name.toLowerCase().replace(/\s/g, '') === req.query.input
        })

        if (!userCity || !userCountry || !userState) {
            return res.status(400).send({ message: 'Your request is not valid!' })
        }
    }

    geocode(req.query.input, (error, location) => {
        forecast(req.query.input, (error, forecast, time, temperature, weatherIcon) => {
        return error
            ? error
            : res.send(
                {
                    time,
                    temperature,
                    forecast,
                    city: req.query.input,
                    location,
                    weatherIcon
                }
            )
        })
    })
}

module.exports = getWeather