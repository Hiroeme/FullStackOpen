// this is the previous iteration
// my bloated version had unnecessary components and checks
// most notably: 
// the search filter did not need to be in a useEffect, : Couldve had the onChange to set the searchValue then it wouldve rerendered itself
// did not need two components showView/Results (couldve reduced it to just one with setting the search state)
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Results } from './components/Results'
import { ShowView } from './components/ShowView'
import { Weather } from './components/Weather'


function App() {
  const [searchValue, setSearchValue] = useState(null)
  const [countries, setCountries] = useState(null)
  const [results, setResults] = useState(null)
  const [showCountry, setShowCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  // run once getAll from database
  useEffect(() => {

    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
        // console.log(response.data)
      })
  }, [])

  // called upon when searchValue is changed
  useEffect(() => {

    if (searchValue && countries) {
      console.log("Our Searchvalue is ", searchValue)

      setWeather(null)
      setShowCountry(null)

      const validCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLowerCase()))

      setResults(validCountries)
    }
  }, [searchValue])

  useEffect(() => {

    if (results) {
      if (results.length === 1) {

        const lat = results[0].latlng[0]
        const lon = results[0].latlng[1]

        axios
        .get(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_SOME_KEY}&q=${lat},${lon}&aqi=no`)
        .then(response => {
          setWeather(response.data)
        })
        .catch( response => {
          console.log(response.response.data.error.message)
      })
      }
    }


  }, [results])


  const searchHandler = (event) => {
    // console.log(event.target.value)
    setSearchValue(event.target.value)
  }

  const showHandler = (country) => {
    // console.log(country.name.common)
    setShowCountry(country)
  }

  const weatherHandler = (country) => {
    if (!country) {
      return null
    }
    const lat = country.latlng[0]
    const lon = country.latlng[1]

    axios
    .get(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_SOME_KEY}&q=${lat},${lon}&aqi=no`)
    .then(response => {
      setWeather(response.data)
    })
    .catch( response => {
      console.log(response.response.data.error.message)
  })
  }

  const viewHandler = (country) => () => {
    showHandler(country)
    weatherHandler(country)
  }



  return (
    <>
      <div>
        find countries <input onChange={searchHandler}></input>

        <Results countries={results} showHandler={viewHandler} weatherHandler={weatherHandler} />
        <ShowView country={showCountry} countries={results} />
        <Weather weather={weather} />
      </div>
    </>
  )
}

export default App