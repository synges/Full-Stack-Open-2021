import React, { useState, useEffect }from 'react'
import axios from 'axios'

import Search from './Search'
import Display from './Display'


const App = () => {
  const [ countries, setcountries] = useState([]) 
  const [ countryFilter, setcountryFilter] = useState('') 

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response =>{
      setcountries(response.data)})
  }, [])

  const handleFilterChange = event => {
    setcountryFilter(event.target.value)
  }

  const countriesToShow = countryFilter ? countries.filter( country => country.name.toLowerCase().includes(countryFilter.toLowerCase()) ) : countries

  return (
    <div>
      <Search countryFilter={countryFilter} handleFilterChange={handleFilterChange}/>
      <Display countriesToShow={countriesToShow}/>
    </div>
  );
}

export default App;
