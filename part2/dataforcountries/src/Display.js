import React from 'react'

const Display = ({countriesToShow}) =>{

    if(countriesToShow.length > 10){
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countriesToShow.length === 1){
        return (
            <div>
                <h2>{countriesToShow[0].name}</h2>
                capital {countriesToShow[0].capital}
                <br/>
                population {countriesToShow[0].population}

                <h3>languages</h3>
                <ul>
                    {countriesToShow[0].languages.map( language => <li key={language.iso639_1}>{language.name}</li>)}
                </ul>

                <img width="100 px" src={countriesToShow[0].flag} alt={countriesToShow[0].name} />    
            </div>
        )
    } else {
        return (
            <div>
                <ul>
                    {countriesToShow.map( country => <li key={country.alpha3Code}>{country.name}</li>)}
                </ul>
            </div>
        )
    }

  
}

export default Display