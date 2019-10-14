const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const connectionString = require('./utils/config').RDS_URI
const moviesRouter = require('./controllers/movies')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info(`connecting to aws rds imdb-app ${connectionString}`)
app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/movies', moviesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app