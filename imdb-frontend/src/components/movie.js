import React from 'react'

const Movie = ({ title, runtime, releaseYear }) => {
    var yr = releaseYear > '2020' || releaseYear < '1875' ? '' : `(${releaseYear})`
    var run = isNaN(Number(runtime)) && (Number(runtime) < 0 || Number(runtime) > 100000) ? '' : `, ${runtime} min`
    return (
        <li>
            {title} {yr}{run}
        </li>  
    )
}

export default Movie