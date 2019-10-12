import React, { useState, useEffect } from 'react';
import './App.css';
import Searchbar from './components/searchbar'
import Movie from './components/movie'
import Button from './components/button'
import moviesService from './services/movies'

function App() {
  const fields = ['Titles A-Z', 'Release year', 'Runtime (in min)', 'All']

  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])
  const [isAsc, setIsAsc] = useState([undefined, undefined]) 
  const [sortBy, setSortBy] = useState(fields[0])
  const [safety, setSafety] = useState(true)
  const [currentButtons, setCurrentButtons] = useState(Array.from(Array(fields.length)).map(entry => entry === 'All' ? true : false))
  
  const buttonsDisplay = () => {
    return fields.map((field, index) => <Button 
      key={index} 
      name={field} 
      index={index} 
      setSortBy={setSortBy} 
      currentButtons={currentButtons}
      setCurrentButtons={setCurrentButtons}
      isAsc={isAsc}
      setIsAsc={setIsAsc}
    />)
  }
  const moviesDisplay = () => {
    if (filtered.length > 0) {
      return filtered.map((movie, index) => 
        <Movie key={index}
               title={movie.primarytitle} 
               runtime={movie['runtimeminutes']} 
               releaseYear={movie.startyear} 
               safety={safety}
              />
        )
    }
  }
  return (
    <>
      {buttonsDisplay()}
      <button onClick={() => setSafety(!safety)}>
        {safety ? 'Parental controls currently on' : 'Parental controls currently off'}
      </button>
      <Searchbar key='searchbar' 
        search={search} 
        setSearch={setSearch} 
        filtered={filtered} 
        setFiltered={setFiltered} 
        sortBy={sortBy} 
        isAsc={isAsc}
        safety={safety}
        setSafety={setSafety}
      />
      {moviesDisplay()}
    </>
  )
}

export default App;
