require('dotenv').config()
const bodyParser = require('body-parser')
const app = require('express')()
const cors = require('cors')
const routes = require('./routes')

app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()) // for parsing application/json
app.use(cors())
app.use(routes)

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}...
Your Weather App: http://localhost:${process.env.PORT}/weather?input=tehran`)
})