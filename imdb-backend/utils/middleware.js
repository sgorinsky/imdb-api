const logger = require('./logger')
const requestLogger = require('./morgan')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'wrong id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } 
    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}