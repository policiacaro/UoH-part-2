import Country_Info from './Country_Info.js';

const Country_List = ({ countryList, search, showClickHandler, weather, weatherIcon }) => {
  //regex condition search.search(/[\s+]/) != -1
  if (countryList.length <= 0){  
    
    return (
      <ul>
        <li><b>No countries found</b></li>
      </ul>
    );
  } else if (countryList.length > 10){
    
    return (
      <ul>
        <li>Too many matches, try more specific search</li>
      </ul>
    );
  } else if (countryList.length > 1){
    
    return (
      <ul>
        {countryList.map(country => <li ap={country.name.common} key={country.name.common}><b>{country.name.common}</b> | Official Name: {country.name.official} <button onClick={() => {showClickHandler(country)}}>Show</button> </li>)}
      </ul>
    );
  } else {
    
    return (
      < Country_Info country={countryList[0]} languages={Object.values(countryList[0].languages)} weather={weather} weatherIcon={weatherIcon} />
    );
  }
}

export default Country_List;