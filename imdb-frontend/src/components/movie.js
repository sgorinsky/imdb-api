import React, { useState } from 'react'

const Movie = ({movie, attributes}) => {
    const [toggleShow, setToggleShow ] = useState(false)
    const yr = movie.startyear > '2020' || movie.startyear < '1875' ? '' : `(${movie.startyear})`
    const run = isNaN(Number(movie.runtimeminutes)) || Number(movie.runtimeminutes) > 900 ? '' : `, ${movie.runtimeminutes} min`
    const show = toggleShow ? {display: ''} : {display: 'none'}
    return (
        <div onClick={() => setToggleShow(!toggleShow)}>
            <p>{movie.primarytitle}{yr}{run}</p>
            <ul style={show}>
                <li>genres: </li>
                <li>cast and crew: </li>
                <li>type: </li>
                <li>region: </li>
            </ul>
        </div>  
    )
}

export default Movie