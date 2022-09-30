const { Country, City, State } = require('country-state-city')
const forecast = require('../APIs/weather.api')

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

        if (!userCity.toString() && !userCountry.toString() && !userState.toString()) {
            return res.status(400).send({ message: 'Your request is not valid!' })
        }
    }

    forecast(req.query.input, (error, response) => {
        dayImages = {
            clear_sky: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1663493428/weather/26_n5rlcj.png',
            few_clouds: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1663494013/weather/27_zbfhns.png',
            scattered_clouds: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1663494076/weather/35_lrem3y.png',
            broken_clouds: '',
            shower_rain: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1663494194/weather/7_y6lslu.png',
            rain: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1663494498/weather/8_ewu9xn.png',
            thunderstorm: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1663494533/weather/12_qhnnso.png',
            snow: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1663494615/weather/23_bxaofq.png',
            mist: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1663494754/weather/6_l1ast9.png'
        }
        nightImages = {
            clear_sky: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1663493912/weather/10_qvkubl.png',
            few_clouds: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1663494042/weather/15_fkic6h.png',
            scattered_clouds: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1663494120/weather/33_pip02o.png',
            broken_clouds: '',
            shower_rain: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1663494368/weather/1_r5v2qk.png',
            rain: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1663494439/weather/2.1_mldnra.png',
            thunderstorm: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1663494582/weather/11_ei8d2j.png',
            snow: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1663494672/weather/40_f4ozxs.png',
            mist: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1663494717/weather/2.2_sm5rr1.png'
        }
        const weekForecast = response.body.list.slice(0, 7)
        const status = weekForecast[0].dt_txt.slice(-9, -7) >= 12 ? 'night' : 'day'
        const newWeekForecast = weekForecast.map((item) => {
            const object = {
                temp_now: item.main.temp-273.15,
                temp_min: item.main.temp_min-273.15,
                temp_max: item.main.temp_max-273.15,
                humidity: item.main.humidity,
                weather: item.weather[0].main,
                weather_description: item.weather[0].description,
                wind: item.wind.speed,
                date: item.dt_txt,
                day_icon: item.weather[0].description === 'clear sky' ? dayImages.clear_sky : item.weather[0].description === 'few clouds' ? dayImages.few_clouds : item.weather[0].description === 'scattered clouds' ? dayImages.scattered_clouds : item.weather[0].description === 'broken clouds' ? dayImages.broken_clouds : item.weather[0].description === 'shower rain' ? dayImages.shower_rain : item.weather[0].description === 'rain' ? dayImages.rain : item.weather[0].description === 'thunderstorm' ? dayImages.thunderstorm : item.weather[0].description === 'snow' ? dayImages.snow : item.weather[0].description === 'mist' ? dayImages.mist : null,
                night_icon: item.weather[0].description === 'clear sky' ? nightImages.clear_sky : item.weather[0].description === 'few clouds' ? nightImages.few_clouds : item.weather[0].description === 'scattered clouds' ? nightImages.scattered_clouds : item.weather[0].description === 'broken clouds' ? nightImages.broken_clouds : item.weather[0].description === 'shower rain' ? nightImages.shower_rain : item.weather[0].description === 'rain' ? nightImages.rain : item.weather[0].description === 'thunderstorm' ? nightImages.thunderstorm : item.weather[0].description === 'snow' ? nightImages.snow : item.weather[0].description === 'mist' ? nightImages.mist : null,
                status
            }
            return object
        })
        return error
            ? error
            : res.send(newWeekForecast)
    })
}

module.exports = getWeather