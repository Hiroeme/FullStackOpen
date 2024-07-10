import axios from "axios"
import { useState, useEffect } from "react"

const Country = ({country}) => {

  const [weather, setWeather] = useState(null)

  const languages = Object.values(country.languages)
  const flagUrl = country.flags.png
  const capital = country.capital[0]

  // lets grab our weather data, runs when we get a country for one time
  useEffect(() => {

    const lat = country.latlng[0]
    const lng = country.latlng[1]

    axios
      .get(`https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${country.name.common}&aqi=no`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(
        console.log(`Unable to find weather data for ${country.name.common}`)
      )
  }, [])

  // return null when we don't have our weather data yet
  if (!weather) {
    return null
  }

  const weatherIconUrl = weather.current.condition.icon


  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>population {country.population}</p>
      <p>capital {capital}</p>

      <h4>languages</h4>

      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}  
      </ul>

      <img src={flagUrl} width='200' />

      <h4>Weather in {capital}</h4>

      <p>temperature {weather.current.temp_f} Fahreinheit</p>

      <img src={weatherIconUrl} width='80' />

      <p>wind {weather.current.wind_mph} mph</p>
    </div>
  )
}



const CountryList = ({countries, showCountry}) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } 


  if (countries.length === 1) {
    return (
      <Country country={countries[0]}/>
    )
  }

  // this sets our search to just that country
  return (
    <div>
      {countries.map(c => 
        <p key={c.fifa}>
          {c.name.common}
          <button 
            onClick={() => showCountry(c.name.common)}>
            show </button>
        </p>
      )}
    </div>
  )


}

const App = () => {
  const [search, setSearch] = useState('fi')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(({ data }) => {
      setCountries(data)
    })
  }, [])

  const matchedContries = countries.filter(c => c.name.common.toLowerCase().includes(search.toLocaleLowerCase()))

  return (
    <div>
      <div>
        find country <input value={search} onChange={({ target }) => setSearch(target.value)} />
      </div>
      <CountryList 
        countries={matchedContries}
        showCountry={setSearch}
      />
    </div>
  )
}

export default App
