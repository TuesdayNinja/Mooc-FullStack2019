import React, { useState, useEffect} from 'react'
import axios from 'axios'

const Search = ({filter, handleFilterChange}) => {
  return(
    <div>
          Search countries <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const Names = ({countries, setFilter}) => {
  return(
    countries.map(country =>
      <div key= {country.name}>
      <p>{country.name} <button onClick={() => setFilter(country.name)}>show</button> </p>
      </div>
      )
  )
}

const Languages = ({languages}) => {
  return(
    languages.map(language =>
    <li key={language.name}>{language.name}</li>
    )
  )
}

const WeatherInformation = ({country}) => {
  const [ weather, setWeather ] = useState(null)

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current',
            {params: {
              access_key: 'b95eb8070b914b017a6b160d09800846',
              query: country.capital}
            }
            )
      .then(response => {
        setWeather(response.data)
      })
  }, [country])


  if(weather==null){
    return(
      <p>No weather information avaible.</p>
    )
  }
  else{
    return(
      <div>
        <h3>Weather in {country.capital}</h3>
        <p>Temperature: {weather.current.temperature} °C</p>
        <p>Wind: {weather.current.wind_speed} kph direction {weather.current.wind_dir}</p>
        <p>{weather.current.weather_descriptions[0]}</p>
        <img src={weather.current.weather_icons} alt="weather icon" style={{width: 100}}/>

      </div>
    )

  }

}


const CountryInformation = ({country}) => {

  return(
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        <Languages languages={country.languages}/>
      </ul>
      <img src={country.flag} alt="Country flag" style={{width: 200}}/>
      <WeatherInformation country={country}/>

    </div>
  )
}

const CountriesShown = ({countries, setFilter, weather}) => {
  if (countries.length >= 10) {
    return(
     <p>Too many matches. Please specify search.</p>
    )
  }
  else if (countries.length > 1){
    return(
      <Names countries={countries} setFilter={setFilter}/>
    )
  }
  else if (countries.length === 1) {
    return(
     <CountryInformation country={countries[0]} weather={weather}/>
    )
  }
  else {
    return (
      <p>No countries found.</p>
    )
  }
}

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  )



  return (
    <div>
      <Search filter={filter} handleFilterChange={handleFilterChange}/>
      <CountriesShown
        countries={filteredCountries}
        setFilter={setFilter}
      />
    </div>
  )
}

export default App;
