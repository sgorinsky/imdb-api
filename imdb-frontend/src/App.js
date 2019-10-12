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
  const [attributes, setAttributes] = useState(null)
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
               movie={movie}
               attributes={attributes} 
          />
        )
    }
  }
  const lookupPath = {
    'Titles A-Z': ['az', 'primarytitle'],
    'Release year': ['startyear', 'startyear'],
    'Runtime (in min)': ['runtime', 'runtimeminutes'],
    'All': ['all', 'primarytitle'],
    'Parental Controls': ['']
  }

  const handleSearch = async event => {
    event.preventDefault()
    var lookup = lookupPath[sortBy]
    const orderBy = isAsc[1] === false ? 'desc' : 'asc'
    console.log(lookup)
    setSafety(safety)
    var isSafe = safety ? 'safetyon' : 'safetyoff'
    const path = lookupPath[sortBy][0] !== 'all' ? `${isSafe}/${lookup[0]}/${orderBy}` : 'all'
    console.log(path)

    var movies = { 'movies': [], 'alreadyIn': {} }
    const all = await moviesService.get(path)
    if (all) {
      for (var i = 0; i < all.length; ++i) {
        const current = all[i]
        const field = current[lookup[1]].toLowerCase()
        const titleField = current.primarytitle.toLowerCase() // lookups in movies.alreadyIn are by primarytitle
        if (!movies.alreadyIn.hasOwnProperty(titleField) && (field.includes(search.toLowerCase()) || titleField.includes(search.toLowerCase()))) {
          movies.movies = movies.movies.concat(current)
          movies.alreadyIn[titleField] = {
            genres: {},
            titletype: {},
            region: {},
            primaryname: {}
          }
          for (var k in current) {
            if (movies.alreadyIn[current.primarytitle.toLowerCase()].hasOwnProperty(k)) {
              if (k !== 'primaryname') {
                movies.alreadyIn[titleField][k] = current[k]
              } else {
                movies.alreadyIn[titleField][k][current.primaryname] = current.primaryprofession
              }
            }
          }
          if (movies.movies.length > 300) {
            break
          }
        } else if (movies.alreadyIn.hasOwnProperty(titleField) && (field.includes(search.toLowerCase()) || titleField.includes(search.toLowerCase()))) {
          for (var key in current) {
            if (movies.alreadyIn[titleField].hasOwnProperty(key) && !movies.alreadyIn[titleField][key].hasOwnProperty(current[key])) {
              if (key !== 'primaryname') {
                movies.alreadyIn[titleField][key] = current[key]
              } else {
                movies.alreadyIn[titleField][key][current.primaryname] = current.primaryprofession
              }
            }
          }
        }
      }
      setFiltered(movies.movies)
      setAttributes(() => movies.alreadyIn)
      console.log(movies.alreadyIn)
      console.log(attributes)
    }
  }   
  return (
    <>
      {buttonsDisplay()}
      <button onClick={() => setSafety(!safety)}>
        {safety ? 'Parental controls currently on' : 'Parental controls currently off'}
      </button>
      <Searchbar key='searchbar' 
        handleSearch={handleSearch}
        search={search} 
        setSearch={setSearch} 
        filtered={filtered} 
        setFiltered={setFiltered} 
        sortBy={sortBy} 
        isAsc={isAsc}
        safety={safety}
        setSafety={setSafety}
        setAttributes={setAttributes}
      />
      {moviesDisplay()}
    </>
  )
}

export default App;
