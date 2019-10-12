import React from 'react'
import moviesService from '../services/movies'

const Searchbar = ({ handleSearch, search, setSearch, setFiltered, sortBy, safety, setSafety, isAsc }) => {
    return (
        <>
            <form onSubmit={handleSearch}>
                search: 
                <input 
                    type='text' 
                    value={search}
                    name='search' 
                    onChange={(event) => setSearch(event.target.value)}
                />
                <button type='submit'>show</button>
            </form>
        </>
    )
}

export default Searchbar