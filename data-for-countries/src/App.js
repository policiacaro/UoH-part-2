/*
icon url https://openweathermap.org/img/wn/01d@4x.png
use d/n after number code for day/night
01 clear sky
02 few clouds
03 scattered clouds
04 broken clouds
09 shower rain
10 rain 
11 thunderstorm
13 snow
50 mist

num and x is size 
*/
//TODO: Store weather API call into array of objects, with country name as key and data as value. reference this data instead of remaking the api call
import { useState, useEffect } from 'react';
import './App.css';
import Search_Form from './Search_Form.js';
import Country_List from './Country_List.js';
import Country_Info from './Country_Info.js';

let size = '2';
let code = '';
let weatherResponse = [];
let iconURL;
let weatherURL;
const weather_key = process.env.REACT_APP_API_KEY;
const countryURL = `https://studies.cs.helsinki.fi/restcountries/api/all`;

function App() {
  const [newSearch, setNewSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [resultCountries, setResultCountries] = useState([]);
  const [weather, setWeather] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState('');
  
  useEffect(() => {
    fetch(countryURL)
    .then(response => response.json())
    .then(data => {
      setCountries(data);
    })
  }, []);
  
  useEffect(() => {
    setWeather(new Array("Fetching Current Weather Data..."))
  }, []);
  
  const handleSearchInputChange = (event) => {
    setNewSearch(event.target.value);
  }
  
  const searchClick = (event, country="none") => {
    event.preventDefault();
    let foundCountries = [];
    
    countries.forEach(country => {
      if ((country.name.common).toLowerCase().includes(newSearch.toLowerCase()) || (country.name.official).toLowerCase().includes(newSearch.toLowerCase())) {
        foundCountries.push(country);
      }
    });
    setResultCountries(foundCountries);
    
    if (foundCountries.length === 1) {

    let lat = foundCountries[0].latlng[0];
    let lon = foundCountries[0].latlng[1];
    weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${weather_key}`
    
    fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
      weatherResponse = [data.current.weather[0].main, data.current.weather[0].description, data.current.weather[0].icon, 
      data.current.temp, data.current.feels_like, data.current.humidity, data.current.wind_speed];
      setWeather(weatherResponse);
      iconURL = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@${size}x.png`;
    })
    .then(() => {
      fetch(iconURL)
      .then(response => {
        setWeatherIcon(response.url);
      });
    }) 
    }
  }
  
  const showClickHandler = (country) => {
    setResultCountries(new Array(country))
    let lat = country.latlng[0];
    let lon = country.latlng[1];
    let weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${weather_key}`;
    
    fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
      setWeather(new Array (data.current.weather[0].main, data.current.weather[0].description, data.current.weather[0].icon, 
      data.current.temp, data.current.feels_like, data.current.humidity, data.current.wind_speed));
      code = data.current.weather[0].icon;
      
    fetch(iconURL)
    .then(response => {
      setWeatherIcon(response.url);
    });
    });
  }


  return (
    <div className="App">
      < Search_Form searchClick={searchClick} handleSearchInputChange={handleSearchInputChange} />
      < Country_List countryList={resultCountries} search={newSearch} showClickHandler={showClickHandler} weather={weather} weatherIcon={weatherIcon} />
    </div>
  );
}

export default App;
