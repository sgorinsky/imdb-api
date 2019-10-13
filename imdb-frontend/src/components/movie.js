import React, { useState } from 'react'

const Movie = ({movie, attributes}) => {
    const [toggleShow, setToggleShow ] = useState(false)
    const yr = movie.startyear > '2020' || movie.startyear < '1875' ? '' : `(${movie.startyear})`
    const run = isNaN(Number(movie.runtimeminutes)) || Number(movie.runtimeminutes) > 900 ? '' : `, ${movie.runtimeminutes} min`
    const show = toggleShow ? {display: ''} : {display: 'none'}
    return (
        <div id="movie-show" className="list-group-item short-fat" onClick={() => setToggleShow(!toggleShow)}>
            <p><strong>{movie.primarytitle}{yr}{run}</strong></p>
            <p className='movie-facts' style={show}>
                genres: , cast and crew: , type: , region:
            </p>
        </div>  
    )
}

export default Movie