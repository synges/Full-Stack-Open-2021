import React from 'react'

import Country from './Country'

const Display = ({countriesToShow, handleCountrychoice}) =>{

    if(countriesToShow.length > 10){
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countriesToShow.length === 1){
        return (
            <Country country={countriesToShow[0]}/>
        )
    } else {
        return (
            <div>
                <ul>
                    {countriesToShow.map( country => 
                        <li key={country.alpha3Code}>{country.name}
                            <button value={country.alpha3Code} onClick={handleCountrychoice}>show</button>
                        </li>
                    )}
                </ul>
            </div>
        )
    }

  
}

export default Display