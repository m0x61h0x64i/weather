if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const swaggerUi = require('swagger-ui-express')
const swagger = require('./controllers/swagger.controller')

app.use(express.static(__dirname + '/public'))
app.use('/api-docs', swaggerUi.serve, swagger)

app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(routes)

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}...
Your Weather App: http://localhost:${process.env.PORT}/weather?input=tehran`)
})