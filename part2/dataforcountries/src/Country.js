import React from 'react'

const Country = ({country}) =>{

    return (
        <div>
            <h2>{country.name}</h2>
            capital {country.capital}
            <br/>
            population {country.population}

            <h3>languages</h3>
            <ul>
                {country.languages.map( language => <li key={language.iso639_1}>{language.name}</li>)}
            </ul>

            <img width="100 px" src={country.flag} alt={country.name} />    
        </div>
    )
     
}

export default Country