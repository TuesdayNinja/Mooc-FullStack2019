import React, { useState, useEffect} from 'react'
import axios from 'axios'

const Search = ({filter, handleFilterChange}) => {
  return(
    <div>
          Search countries <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const Names = ({countries, filterCountries}) => {
  return(
    countries.filter(filterCountries).map(country => <p key= {country.name}>{country.name}</p>)
  )
}

const Languages = ({languages}) => {
  console.log(languages)
  return(
    languages.map(language =>
    <li key={language.name}>{language.name}</li>
    )
  )
}

const CountrieInformation = ({countries, filterCountries}) => {
  return(
    countries.filter(filterCountries).map(country =>
      <div key= {country.name}>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
          <Languages languages={country.languages}/>
        </ul>
        <img src={country.flag} alt="Country flag" style={{width: 200}}/>
      </div>
    )
  )
}

const CountriesShown = ({countries, filterCountries}) => {

  if (countries.filter(filterCountries).length > 10) {
    return(
     <p>Too many matches. Please specify search.</p>
    )
  }
  if (countries.filter(filterCountries).length < 10 && countries.filter(filterCountries).length > 1){
    return(
      <Names countries={countries} filterCountries={filterCountries}/>
    )
  }
  else{
    return(
     <CountrieInformation countries={countries} filterCountries={filterCountries}/>    )
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

  const filterCountries = (countries) => {
    return(
      countries.name.toLowerCase().includes(filter.toLowerCase())
    )
  }


  return (
    <div>
      <Search filter={filter} handleFilterChange={handleFilterChange}/>
      <CountriesShown countries={countries} filterCountries={filterCountries}/>
    </div>
  )
}

export default App;
