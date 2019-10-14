const { Pool } = require('pg')
const connectionString = require('../utils/config').RDS_URI
const queries = require('./queries')

// movie lookups stored in rest
const movies = {
    'safetyOn': {
        'az': {
            'asc': '',
            'desc': ''
        },
        'startyear': {
            'asc': '',
            'desc': ''
        },
        'runtime': {
            'asc': '',
            'desc': ''
        }
    },
    'safetyOff': {
        'az': {
            'asc': '',
            'desc': ''
        },
        'startyear': {
            'asc': '',
            'desc': ''
        },
        'runtime': {
            'asc': '',
            'desc': ''
        }
    },
    'all': ''
} 


const loadInData = async () => {
    const pool = new Pool({
        connectionString: connectionString,
    })

    // Safety on (without adult films)
    pool.query(queries['safetyOn']['az']['asc'], (error, response) => {
        movies['safetyOn']['az']['asc'] = response.rows
        console.log('Retrieved safety on az asc')
    })
    pool.query(queries['safetyOn']['az']['desc'], (error, response) => {
        movies['safetyOn']['az']['desc'] = response.rows
        console.log('Retrieved safety on az desc')
    })
    pool.query(queries['safetyOn']['startyear']['asc'], (error, response) => {
        movies['safetyOn']['startyear']['asc'] = response.rows
        console.log('Retrieved safety on startyear asc')
    })
    pool.query(queries['safetyOn']['startyear']['desc'], (error, response) => {
        movies['safetyOn']['startyear']['desc'] = response.rows
        console.log('Retrieved safety on startyear desc')
    })
    pool.query(queries['safetyOn']['runtime']['asc'], (error, response) => {
        movies['safetyOn']['runtime']['asc'] = response.rows
        console.log('Retrieved safety on runtime asc')
    })
    pool.query(queries['safetyOn']['runtime']['desc'], (error, response) => {
        movies['safetyOn']['runtime']['desc'] = response.rows
        console.log('Retrieved safety on runtime desc')
    })

    // Safety off (with adult films)
    pool.query(queries['safetyOff']['az']['asc'], (error, response) => {
        movies['safetyOff']['az']['asc'] = response.rows
        console.log('Retrieved safety off az asc')
    })
    pool.query(queries['safetyOff']['az']['desc'], (error, response) => {
        movies['safetyOff']['az']['desc'] = response.rows
        console.log('Retrieved safety off az desc')
    })
    pool.query(queries['safetyOff']['startyear']['asc'], (error, response) => {
        movies['safetyOff']['startyear']['asc'] = response.rows
        console.log('Retrieved safety off startyear asc')
    })
    pool.query(queries['safetyOff']['startyear']['desc'], (error, response) => {
        movies['safetyOff']['startyear']['desc'] = response.rows
        console.log('Retrieved safety off startyear desc')
    })
    pool.query(queries['safetyOff']['runtime']['asc'], (error, response) => {
        movies['safetyOff']['runtime']['asc'] = response.rows
        console.log('Retrieved safety off runtime asc')
    })
    pool.query(queries['safetyOff']['runtime']['desc'], (error, response) => {
        movies['safetyOff']['runtime']['desc'] = response.rows
        console.log('Retrieved safety off runtime desc')
    })

    // ALL Query
    pool.query(queries['all'], (error, response) => {
        movies['all'] = response.rows
        console.log('Retrieved all')
        pool.end()
        console.log('Pool is closed')
    })
}
loadInData()

module.exports = movies


