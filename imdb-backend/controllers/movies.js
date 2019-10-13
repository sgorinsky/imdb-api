const moviesRouter = require('express').Router()
const movies = require('../db/index.js')

// safety on
moviesRouter.get('/safetyon/az/asc',  (request, response, next) => {
    try {
        const all = movies['safetyOn']['az']['asc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyon/az/desc', (request, response, next) => {
    try {
        const all = movies['safetyOn']['az']['desc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyon/startyear/asc', (request, response, next) => {
    try {
        const all = movies['safetyOn']['startyear']['asc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyon/startyear/desc',  (request, response, next) => {
    try {
        const all = movies['safetyOn']['startyear']['desc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyon/runtime/asc', (request, response, next) => {
    try {
        const all = movies['safetyOn']['runtime']['asc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyon/runtime/desc', (request, response, next) => {
    try {
        const all = movies['safetyOn']['runtime']['desc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})

// safety off
moviesRouter.get('/safetyoff/az/asc',  (request, response, next) => {
    try {
        const all = movies['safetyOff']['az']['asc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyoff/az/desc',  (request, response, next) => {
    try {
        const all = movies['safetyOff']['az']['desc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyoff/startyear/asc',  (request, response, next) => {
    try {
        const all = movies['safetyOff']['startyear']['asc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyoff/startyear/desc',  (request, response, next) => {
    try {
        const all = movies['safetyOff']['startyear']['desc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyoff/runtime/asc', (request, response, next) => {
    try {
        const all = movies['safetyOff']['runtime']['asc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyoff/runtime/desc', (request, response, next) => {
    try {
        const all = movies['safetyOff']['runtime']['desc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})

// all
moviesRouter.get('/all',  (request, response, next) => {
    try {
        const all = movies['all']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})

module.exports = moviesRouter