const forecast = require('./weather.js')
const geocode = require('./geocode.js')
const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/weather', (req, res) => {
    if (!req.query.city) {
        return res.send({
            Hint: 'Enter your city after URL.',
            example: 'URL?city=<HERE>'
        })
    }

    geocode(req.query.city, (error, location) => {
        if (error) {
            res.send({
                error
            })
        } else {
            forecast(req.query.city, (error, forecast, time, temperature, weatherIcon) => {
                if (error) {
                    res.send({
                        error
                    })
                } else {
                    res.send({
                        time,
                        temperature,
                        forecast,
                        city: req.query.city,
                        location,
                        weatherIcon
                    })
                }
            })
        }
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running....')
})