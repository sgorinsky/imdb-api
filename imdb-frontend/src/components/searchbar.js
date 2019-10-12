import React from 'react'
import moviesService from '../services/movies'

const Searchbar = ({ search, setSearch, setFiltered, sortBy, safety, setSafety, isAsc, size=400 }) => {
    const lookupPath = {
        'Titles A-Z':['az','primarytitle'], 
        'Release year':['startyear','startyear'], 
        'Runtime (in min)':['runtime','runtimeminutes'],
        'All':['all','primarytitle'],
        'Parental Controls':['']
    }

    const handleSearch = async (event) => {
        event.preventDefault()
        var lookup = lookupPath[sortBy]
        const orderBy = isAsc[1] === false ? 'desc' : 'asc'
        console.log(lookup)
        setSafety(safety)
        var isSafe = safety ? 'safetyon' : 'safetyoff'
        const path = lookupPath[sortBy][0] !== 'all' ? `${isSafe}/${lookup[0]}/${orderBy}` : 'all'
        console.log(path)

        var movies = {'movies':[], 'alreadyIn':{}}
        const all = await moviesService.get(path)
        console.log(all)
        if (all) {
            for (var i = 0; i < all.length; ++i) {
                const current = all[i]
                const field = current[lookup[1]].toLowerCase()
                if (field.includes(search.toLowerCase()) && !movies.alreadyIn.hasOwnProperty(field) && sortBy[0] === 'primarytitles') {
                    movies.movies = movies.movies.concat(current)
                    movies.alreadyIn[field] = true
                    if (movies.movies.length > 400) {
                        break
                    }
                } else {
                    movies.movies = movies.movies.concat(current)
                    if (movies.movies.length > size) {
                        break
                    }
                }
            }
            console.log(movies.movies)
            setFiltered(movies.movies)
        }   
    }   
    return (
        <>
            <form onSubmit={handleSearch}>
                search: 
                <input 
                    type='text' 
                    value={search}
                    name='search' 
                    onChange={({target}) => {
                        setSearch(target.value)
                        console.log(target.value)
                        }
                    }
                />
                <button type='submit'>show</button>
            </form>
        </>
    )
}

export default Searchbar