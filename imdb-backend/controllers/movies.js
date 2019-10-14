const moviesRouter = require('express').Router()
const movies = require('../db/index.js')

// safety on
moviesRouter.get('/safetyon/az/asc',  async (request, response, next) => {
    try {
        const all = movies['safetyOn']['az']['asc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyon/az/desc', async (request, response, next) => {
    try {
        const all = movies['safetyOn']['az']['desc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyon/startyear/asc', async (request, response, next) => {
    try {
        const all = movies['safetyOn']['startyear']['asc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyon/startyear/desc',  async (request, response, next) => {
    try {
        const all = movies['safetyOn']['startyear']['desc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyon/runtime/asc', async (request, response, next) => {
    try {
        const all = movies['safetyOn']['runtime']['asc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyon/runtime/desc', async (request, response, next) => {
    try {
        const all = movies['safetyOn']['runtime']['desc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})

// safety off
moviesRouter.get('/safetyoff/az/asc',  async (request, response, next) => {
    try {
        const all = movies['safetyOff']['az']['asc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyoff/az/desc',  async (request, response, next) => {
    try {
        const all = movies['safetyOff']['az']['desc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyoff/startyear/asc',  async (request, response, next) => {
    try {
        const all = movies['safetyOff']['startyear']['asc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyoff/startyear/desc',  async (request, response, next) => {
    try {
        const all = movies['safetyOff']['startyear']['desc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyoff/runtime/asc', async (request, response, next) => {
    try {
        const all = movies['safetyOff']['runtime']['asc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})
moviesRouter.get('/safetyoff/runtime/desc', async (request, response, next) => {
    try {
        const all = movies['safetyOff']['runtime']['desc']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})

// all
moviesRouter.get('/safetyon/all',  (request, response, next) => {
    try {
        const all = movies['safetyOn']['all']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})

moviesRouter.get('/safetyoff/all', (request, response, next) => {
    try {
        const all = movies['safetyOff']['all']
        response.json(all);
    } catch (exception) {
        next(exception);
    }
})

module.exports = moviesRouter