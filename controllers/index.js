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
        if (error) {
            return res.status(500).send({ message: error.toString() })
        }

        dayImages = {
            clear_sky: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1680769672/weather/26_q33cpe.webp',
            few_clouds: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1680769714/weather/27_isvb25.webp',
            scattered_clouds: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1680768901/weather/35_n1gcvi.webp',
            broken_clouds: '',
            shower_rain: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1680768445/weather/7_qqo3va.webp',
            rain: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1680769628/weather/8_ag9v8d.webp',
            thunderstorm: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1680768572/weather/12_y6sjeg.webp',
            snow: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1680768711/weather/23_r85fyl.webp',
            mist: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1680769570/weather/6_hwqxbs.webp'
        }

        nightImages = {
            clear_sky: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1680769802/weather/10_bef1gb.webp',
            few_clouds: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1680769336/weather/15_vnhwlm.webp',
            scattered_clouds: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1680768853/weather/33_ae7ft4.webp',
            broken_clouds: '',
            shower_rain: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1680769012/weather/1_vlgvls.webp',
            rain: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1680769012/weather/1_vlgvls.webp',
            thunderstorm: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1680769278/weather/11_bpaqph.webp',
            snow: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1680769473/weather/40_lcxudo.webp',
            mist: 'https://res.cloudinary.com/dw2hii7vj/image/upload/v1680769216/weather/2.2_bbpb32.webp'
        }

        const weekForecast = response.data.list.slice(0, 7)
        const newWeekForecast = weekForecast.map((item) => {
            const object = {
                temp_now: (item.main.temp-273.15).toFixed(1),
                temp_min: (item.main.temp_min-273.15).toFixed(1),
                temp_max: (item.main.temp_max-273.15).toFixed(1),
                humidity: item.main.humidity,
                weather: item.weather[0].main,
                weather_description: item.weather[0].description,
                wind: item.wind.speed,
                date: item.dt_txt,
                day_icon: item.weather[0].main === 'Clear' ? dayImages.clear_sky : item.weather[0].main === 'Clouds' ? dayImages.few_clouds : item.weather[0].description === 'scattered clouds' ? dayImages.scattered_clouds : item.weather[0].description === 'broken clouds' ? dayImages.broken_clouds : item.weather[0].main === 'Rain' ? dayImages.shower_rain : item.weather[0].main === 'rain' ? dayImages.rain : item.weather[0].main === 'Thunderstorm' ? dayImages.thunderstorm : item.weather[0].main === 'Snow' ? dayImages.snow : item.weather[0].main === 'Mist' ? dayImages.mist : item.weather[0].main === 'Drizzle' ? dayImages.shower_rain : null,
                night_icon: item.weather[0].main === 'Clear' ? nightImages.clear_sky : item.weather[0].main === 'Clouds' ? nightImages.few_clouds : item.weather[0].description === 'scattered clouds' ? nightImages.scattered_clouds : item.weather[0].description === 'broken clouds' ? nightImages.broken_clouds : item.weather[0].main === 'Rain' ? nightImages.shower_rain : item.weather[0].main === 'rain' ? nightImages.rain : item.weather[0].main === 'Thunderstorm' ? nightImages.thunderstorm : item.weather[0].main === 'Snow' ? nightImages.snow : item.weather[0].main === 'Mist' ? nightImages.mist : item.weather[0].main === 'Drizzle' ? nightImages.shower_rain : null,
                country: response.data.city.country,
                timezone: response.data.city.timezone,
                sunrise: response.data.city.sunrise,
                sunset: response.data.city.sunset,
            }
            return object
        })
        return res.send(newWeekForecast)
    })
}

module.exports = getWeather