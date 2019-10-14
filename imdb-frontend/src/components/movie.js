import React, { useState } from 'react'

const Movie = ({movie}) => {
    const [toggleShow, setToggleShow ] = useState(false)
    // movie fields should be in correct format
    const yr = movie.startyear > '2020' || movie.startyear < '1875' ? '' : ` (${movie.startyear})`
    const run = isNaN(Number(movie.runtimeminutes)) || Number(movie.runtimeminutes) > 900 ? '' : `, ${movie.runtimeminutes} min`
    return (
        <div id="movie-show" className="list-group-item short-fat" onClick={() => setToggleShow(!toggleShow)}>
            <p>
                <a className="link" target="_blank" rel="noopener noreferrer" href={`https://google.com/search?q=${movie.primarytitle.replace(/\s+/g,'+')}`}>
                {movie.primarytitle}
                </a>
                {yr}{run}
            </p>  
        </div>  
    )
}

export default Movie