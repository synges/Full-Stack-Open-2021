import React, { useState, useEffect }from 'react'
import axios from 'axios'

import Search from './Search'
import Display from './Display'


const App = () => {
  const [ countries, setcountries] = useState([])
  const [ countriesToShow, setcountriesToShow] = useState([])  
  const [ countryFilter, setcountryFilter] = useState('') 

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response =>{
      setcountries(response.data)
      setcountriesToShow(response.data)})
  }, [])

  const handleFilterChange = event => {
    setcountryFilter(event.target.value)
    setcountriesToShow(countries.filter( country => country.name.toLowerCase().includes(countryFilter.toLowerCase()) ))
  }

  const handleCountrychoice = event => {
    setcountriesToShow(countries.filter( country => country.alpha3Code === event.target.value))
    setcountryFilter('')
  }

  return (
    <div>
      <Search countryFilter={countryFilter} handleFilterChange={handleFilterChange}/>
      <Display countriesToShow={countriesToShow} handleCountrychoice={handleCountrychoice}/>
    </div>
  );
}

export default App;
