import React from 'react'

const Button = ({ index, name, isAsc, setIsAsc, currentButtons, setCurrentButtons, setSortBy, filtered, setFiltered }) => {
    // isAsc has [indexOfButtonPressed, boolean]
    // show updates asc or desc we display to user in button
    const show = isAsc[0] === index && isAsc[1] !== undefined && name.toLowerCase() !== 'all' ? isAsc[1] ? 'asc' : 'desc' : ''
    
    // user presses one button, updates others accordingly
    const toggleButton = () => {
        // if same button, setIsAsc hook retoggles show
        index === isAsc[0] ? setIsAsc([index, !isAsc[1]]) : setIsAsc([index, true])
        setCurrentButtons(Array.from(Array(4)).map((entry, idx) => idx === index ? true : false))
        setSortBy(name)
    }
    return (
        <button onClick={toggleButton} type="button" className="btn btn-space btn-secondary btn-sm"> {currentButtons[index] ? `sort by ${name} ${show}`: name} </button>
    )
}

export default Button