//import { useState } from 'react'; 
const Country_Info = ({ country, languages, weather, weatherIcon }) => {

  return (
    <>
      <h1><b>{country.name.common}</b></h1>
      <ul>
        <li><b>Official Name: </b>{country.name.official}</li>
        <li><b>Capital: </b>{country.capital[0]}</li>
        <li><b>Population: </b>{country.population}</li>
        <li><b>Area: </b>{country.area}</li>
        <li><b>Languages:</b>
          <ul id="langList">
          {languages.map(language => <li key={language}>{language}</li>)}
          </ul>
        </li>
        <li><b>Flag: </b>
          <ul>
            <li>{country.flag}</li>
            <li><img src={country.flags.png} alt={country.flags.alt}/></li>
          </ul>
        </li>
        <li><img src={weatherIcon} /></li>
        <li><b>Current Weather: </b>{weather[0]} -- {weather[1]}
          <ul>
            <li><b>Temperature: </b>{weather[3]} Celsius | <b>Feels like: </b>{weather[4]}</li>
            <li><b>Humidity: </b>{weather[5]}</li>
            <li><b>Wind Speed: </b>{weather[6]}</li>
          </ul>
        </li>
      </ul>
    </>
  );
}

export default Country_Info;