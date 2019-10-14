/* 
original query for joining all 4 tables: 
create table az_asc as 
(select distinct primarytitle, startyear, genres, region, language, runtimeminutes, isadult, primaryname, primaryprofession, knownfortitles from 
    (select directors as nconst, tconst from titlecrew where directors NOT like '%N%'  
        union 
            select writers, tconst from titlecrew where writers NOT LIKE '%N%') t1 
    join titlebasics on t1.tconst = titlebasics.tconst 
    join titleakas on t1.tconst = titleakas.titleid 
    join namebasics on t1.nconst = namebasics.nconst);
*/
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
queries['safetyOn']['az']['asc'] = 'SELECT * FROM az_asc WHERE NOT isadult = \'1\' ORDER BY primarytitle LIMIT 60000;'
queries['safetyOn']['az']['desc'] = 'SELECT * FROM az_asc WHERE NOT isadult = \'1\' ORDER BY primarytitle DESC LIMIT 60000;'

queries['safetyOn']['startyear']['asc'] = 'SELECT * FROM year_asc WHERE NOT isadult=\'1\' AND startyear BETWEEN \'1850\' AND \'2020\' AND startyear ~ \'^[0-9\.]+$\' LIMIT 60000;'
queries['safetyOn']['startyear']['desc'] = 'SELECT * FROM year_asc WHERE NOT isadult=\'1\' AND startyear BETWEEN \'1850\' AND \'2020\' AND startyear ~ \'^[0-9\.]+$\' ORDER BY startyear DESC LIMIT 60000;'

queries['safetyOn']['runtime']['asc'] = 'SELECT * FROM az_asc WHERE runtimeminutes BETWEEN \'0\' AND \'A\' AND runtimeminutes ~ \'^[0-9\.]+$\' ORDER BY runtimeminutes ASC LIMIT 60000;'
queries['safetyOn']['runtime']['desc'] = 'SELECT LENGTH(runtimeminutes) as runtime_string_length, * FROM az_asc where runtimeminutes BETWEEN \'0\' AND \'A\' AND length(runtimeminutes) = 3 AND NOT isadult = \'1\' AND runtimeminutes ~ \'^[0-9\.]+$\' ORDER BY runtime_string_length, runtimeminutes desc LIMIT 60000;' 

// safety filter off
queries['safetyOff']['az']['asc'] = 'SELECT * FROM az_asc ORDER BY primarytitle ASC LIMIT 60000;'
queries['safetyOff']['az']['desc'] = 'SELECT * FROM az_asc ORDER BY primarytitle DESC LIMIT 60000;'

queries['safetyOff']['startyear']['asc'] = 'SELECT * FROM year_asc WHERE startyear BETWEEN \'1850\' AND \'2020\' AND startyear ~ \'^[0-9\.]+$\' LIMIT 60000;'
queries['safetyOff']['startyear']['desc'] = 'SELECT * FROM year_asc WHERE startyear BETWEEN \'1850\' AND \'2020\' AND startyear ~ \'^[0-9\.]+$\' ORDER BY startyear DESC LIMIT 60000;'

queries['safetyOff']['runtime']['asc'] = 'SELECT * FROM az_asc WHERE runtimeminutes BETWEEN \'0\' AND \'A\' AND runtimeminutes ~ \'^[0-9\.]+$\' ORDER BY runtimeminutes ASC LIMIT 60000;'
queries['safetyOff']['runtime']['desc'] = 'SELECT LENGTH(runtimeminutes) as runtime_string_length, * FROM az_asc where runtimeminutes < \'A\' and length(runtimeminutes) = 3 AND runtimeminutes ~ \'^[0-9\.]+$\' ORDER BY runtime_string_length, runtimeminutes desc LIMIT 60000;'

// for searching
queries['all'] = 'SELECT * FROM az_asc ORDER BY primarytitle ASC'
module.exports = queries 