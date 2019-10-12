// storing queries since it's messy to include them all in the db's index.js
const queries = {
    'safetyOn': {
        'az':{
            'asc': '',
            'desc': ''
        },
        'startyear': {
            'asc': '',
            'desc': ''
        },
        'runtime':{
            'asc':'',
            'desc':''
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

// safety on -- not adult
queries['safetyOn']['az']['asc'] = 'SELECT * FROM az_asc WHERE NOT isadult = \'1\';'
queries['safetyOn']['az']['desc'] = 'SELECT * FROM az_asc WHERE NOT isadult = \'1\' ORDER BY primarytitle DESC ;'

queries['safetyOn']['startyear']['asc'] = 'SELECT * FROM year_asc WHERE NOT isadult=\'1\' AND startyear BETWEEN \'1850\' AND \'2020\' ;'
queries['safetyOn']['startyear']['desc'] = 'SELECT * FROM year_asc WHERE NOT isadult=\'1\' AND startyear BETWEEN \'1850\' AND \'2020\' ORDER BY startyear DESC ;'

queries['safetyOn']['runtime']['asc'] = 'SELECT * FROM runtime_asc WHERE NOT isadult=\'1\' ;'
queries['safetyOn']['runtime']['desc'] = 'SELECT * FROM runtime_asc WHERE NOT isadult=\'1\' ORDER BY runtimeminutes DESC ;'

// safety filter off
queries['safetyOff']['az']['asc'] = 'SELECT * FROM az_asc ;'
queries['safetyOff']['az']['desc'] = 'SELECT * FROM az_asc ORDER BY primarytitle DESC ;'

queries['safetyOff']['startyear']['asc'] = 'SELECT * FROM year_asc WHERE startyear BETWEEN \'1850\' AND \'2020\' ;'
queries['safetyOff']['startyear']['desc'] = 'SELECT * FROM year_asc WHERE startyear BETWEEN \'1850\' AND \'2020\' ORDER BY startyear DESC ;'

queries['safetyOff']['runtime']['asc'] = 'SELECT * FROM runtime_asc ;'
queries['safetyOff']['runtime']['desc'] = 'SELECT * FROM runtime_asc ORDER BY runtimeminutes DESC ;'

// for searching
queries['all'] = 'SELECT * FROM az_asc'
module.exports = queries 