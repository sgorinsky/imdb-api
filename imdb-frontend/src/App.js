import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// components
import Searchbar from './components/searchbar'
import Movie from './components/movie'
import Button from './components/button'
import Page from './components/page'
// rest get service
import moviesService from './services/movies'

// determining rest paths based on react states
const lookupPath = {
  'Titles A-Z': ['az', 'primarytitle'],
  'Release year': ['startyear', 'startyear'],
  'Runtime (in min)': ['runtime', 'runtimeminutes'],
  'All': ['all', 'primarytitle'],
  'Parental Controls': ['']
}

function App() {
  // sort button fields
  const fields = ['All', 'Titles A-Z', 'Release year', 'Runtime (in min)' ]

  // hooks
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])
  const [isAsc, setIsAsc] = useState([undefined, undefined]) 
  const [sortBy, setSortBy] = useState('All')
  const [safety, setSafety] = useState(false)
  const [currentButtons, setCurrentButtons] = useState(Array.from(Array(fields.length)).map(entry => entry === 'All' ? true : false))
  const [page, setPage] = useState(1)
  const [loader, setLoader] = useState(false)
  
  useEffect(() => {
    handleDisplay('safetyoff/all', 4999)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // display sort by buttons
  const buttonsDisplay = fields.map((field, index) => <Button 
      key={index} 
      name={field} 
      index={index} 
      setSortBy={setSortBy} 
      currentButtons={currentButtons}
      setCurrentButtons={setCurrentButtons}
      isAsc={isAsc}
      setIsAsc={setIsAsc}
      filtered={filtered}
      setFiltered={setFiltered}
    />)
  
  // display movie cards
  const moviesDisplay = filtered.length > 0 ? filtered.map((movie, index) => 
        <Movie key={index}
               movie={movie}
          />)
        : []

  // on page render or search bar submit, display movies accordingly
  const handleDisplay = async (path = 'all', size=2499) => {
    setLoader(true) // shows spinner while going through function
    var movies = { 'movies': [], 'alreadyIn': {} } // movies will be what we display, alreadyIn is existing set of movies
    const all = await moviesService.get(path) // get from rest
    if (all) {
      for (var i = 0; i < all.length; ++i) {
        const current = all[i] 
        const field = current[lookupPath[sortBy][1]].toLowerCase() // entry of field we are looking for (ie. primarytitle, ...)
        const titleField = current.primarytitle.toLowerCase() // lookups in movies.alreadyIn are by primarytitle
        
        // checks if alreadyIn and input from search bar is in the title or relevant field
        if (!movies.alreadyIn.hasOwnProperty(titleField) && (field.includes(search.toLowerCase()) || titleField.includes(search.toLowerCase()))) {
          movies.movies = movies.movies.concat(current)
          movies.alreadyIn[titleField] = true
          
          if (movies.movies.length > size) { // don't want to store too much on client side
            break
          }
        } 
      }
      setLoader(false) // no more spinner
      setFiltered(movies.movies) // redisplay movies user wants
    }
  }
  
  const handleSearch = async (event) => {
    event.preventDefault()
    
    // handles rest path user gets from
    const orderBy = isAsc[1] === false ? 'desc' : 'asc' 
    setSafety(safety)
    var isSafe = safety ? 'safetyon' : 'safetyoff'
    const path = lookupPath[sortBy][0] !== 'all' ? `${isSafe}/${lookupPath[sortBy][0]}/${orderBy}` : `${isSafe}/all`
    handleDisplay(path)
  }
  
  return (
    <div className='app'>      
      <div className="buttons">
        {buttonsDisplay}
        <button className="btn btn-space btn-light btn-sm" onClick={() => setSafety(!safety)}>
          {safety ? 'Parental controls currently on' : 'Parental controls currently off'}
        </button>
      </div>
      <Searchbar key='searchbar' 
        handleSearch={handleSearch}
        search={search} 
        setSearch={setSearch} 
        loader={loader}
        setPage={setPage}
      />
      <Page array={moviesDisplay} page={page} setPage={setPage} />
    </div>
  )
}

export default App;
