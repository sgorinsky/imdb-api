import React from 'react'

const Button = ({ index, name, isAsc, setIsAsc, currentButtons, setCurrentButtons, setSortBy }) => {
    const show = isAsc[0] === index && isAsc[1] !== undefined && name.toLowerCase() !== 'all' ? isAsc[1] ? 'asc' : 'desc' : ''
    const toggleButton = () => {
        index === isAsc[0] ? setIsAsc([index, !isAsc[1]]) : setIsAsc([index, true]) 
        setCurrentButtons(Array.from(Array(4)).map((entry, idx) => idx === index ? true : false))
        setSortBy(name)
    }
    return (
        <button onClick={toggleButton}> {currentButtons[index] ? `sorted by ${name} ${show}`: name} </button>
    )
}

export default Button