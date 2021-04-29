import React, { useState, useEffect }from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Country = ({country}) =>{
    const [ capitalTemp, setCapitalTemp] = useState('')
    const [ capitalIcon, setCapitalIcon] = useState('')
    const [ capitalWindSpeed, setCapitalWindSpeed] = useState('')
    const [ capitalWindDirection, setCapitalWindDirection] = useState('')

    useEffect(() => {
        axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
        .then(response =>{
            setCapitalTemp(response.data.current.temperature)
            setCapitalIcon(response.data.current.weather_icons[0])
            setCapitalWindSpeed(response.data.current.wind_speed)
            setCapitalWindDirection(response.data.current.wind_dir)
        })
      }, [country.capital])

    return (
        <div>
            <h2>{country.name}</h2>
            capital {country.capital}
            <br/>
            population {country.population}

            <h3>Spoken languages</h3>
            <ul>
                {country.languages.map( language => <li key={language.iso639_1}>{language.name}</li>)}
            </ul>

            <img width="100 px" src={country.flag} alt={country.name} /> 

            <h3>Weather in {country.capital}</h3>
            tempreature: {capitalTemp} Celcuis
            <br/>
            <img width="50 px" src={capitalIcon} alt={capitalIcon} /> 
            <br/>
            wind: {capitalWindSpeed} mph  direction {capitalWindDirection}
        </div>
    )   
     
}

export default Country