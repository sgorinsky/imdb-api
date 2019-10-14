import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Searchbar from './components/searchbar'
import Movie from './components/movie'
import Button from './components/button'
import Page from './components/page'
import moviesService from './services/movies'

const lookupPath = {
  'Titles A-Z': ['az', 'primarytitle'],
  'Release year': ['startyear', 'startyear'],
  'Runtime (in min)': ['runtime', 'runtimeminutes'],
  'All': ['all', 'primarytitle'],
  'Parental Controls': ['']
}

function App() {
  const fields = ['All', 'Titles A-Z', 'Release year', 'Runtime (in min)' ]

  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])
  const [isAsc, setIsAsc] = useState([undefined, undefined]) 
  const [sortBy, setSortBy] = useState('All')
  const [safety, setSafety] = useState(true)
  const [currentButtons, setCurrentButtons] = useState(Array.from(Array(fields.length)).map(entry => entry === 'All' ? true : false))
  const [attributes, setAttributes] = useState(null)
  const [page, setPage] = useState(1)
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    handleDisplay('all', 4999)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
  
  const moviesDisplay = filtered.length > 0 ? filtered.map((movie, index) => 
        <Movie key={index}
               movie={movie}
               attributes={attributes} 
          />)
        : []

  const handleDisplay = async (path = 'all', size=2499) => {
    setLoader(true)
    var movies = { 'movies': [], 'alreadyIn': {} }
    const all = await moviesService.get(path)
    if (all) {
      for (var i = 0; i < all.length; ++i) {
        const current = all[i]
        
        const field = current[lookupPath[sortBy][1]].toLowerCase()
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
          if (movies.movies.length > size) {
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
      setLoader(false)
      setFiltered(movies.movies)
      setAttributes(() => movies.alreadyIn)
    }
  }
  
  const handleSearch = async (event) => {
    event.preventDefault()
    const orderBy = isAsc[1] === false ? 'desc' : 'asc'
    setSafety(safety)
    var isSafe = safety ? 'safetyon' : 'safetyoff'
    const path = lookupPath[sortBy][0] !== 'all' ? `${isSafe}/${lookupPath[sortBy][0]}/${orderBy}` : 'all'
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
