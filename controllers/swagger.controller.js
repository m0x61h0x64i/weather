const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            title: 'Weather App - APIs',
            version: '5.0.0',
        },
        servers:
        [
            {
                url: 'https://quaint-fawn-snaps.cyclic.app'
            },
            {
                url: `http://localhost:${process.env.PORT}`
            }
        ],
    },
    apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

const options = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Happy Learning',
    customfavIcon: 'https://i.postimg.cc/xCxRcXfH/484546.jpg'
}

module.exports = swaggerUi.setup(swaggerDocs, options)