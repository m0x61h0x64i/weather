const express = require('express')
const app = express()
const forecast = require('./weather.js')
const geocode = require('./geocode.js')

const path = require('path')
const public = path.join(__dirname, 'public')
app.use(express.static(public))

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