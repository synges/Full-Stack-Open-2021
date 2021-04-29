import React from 'react'

const Search = ({countryFilter, handleFilterChange}) =>{
    return (
        <div>
            find countries
            <input value={countryFilter} onChange={handleFilterChange}/>
        </div>
    )
  
}

export default Search