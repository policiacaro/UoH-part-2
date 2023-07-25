import Person from './Person.js';

const Filter_Results = (props) => (
  <div className="flexbox">
    <h3>Search Entries</h3>
    <input value={props.newSearch} onChange={props.handleSearchInputChange} />
    <button type="button" onClick={props.handleSearchClick}>Search People</button>
    <ul>
      {props.results.map( result => < Person key={result.name} name={result.name} number={result.number} />)}
    </ul>
  </div>
)

export default Filter_Results;