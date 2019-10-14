import React from 'react'

const Searchbar = ({ handleSearch, search, setSearch, loader, setPage }) => {
    const handleChange = (event) => {
        setSearch(event.target.value)
    }
    
    return (
        <div className="form-group">
            <form onSubmit={handleSearch}>
                <input
                    id="input"
                    placeholder='search'
                    type='text' 
                    value={search}
                    name='search' 
                    onChange={handleChange}
                />
                <button type='submit' id="search-button" className="btn btn-space btn-sm btn-primary" onClick={() => setPage(1)}>
                    show
                </button>
            </form>
            <div className="loader" style={loader ? {display: ''}: {display:'none'}}></div>
        </div>
    )
}

export default Searchbar