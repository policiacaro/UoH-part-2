import Person from './Person.js';

const People = (props) => (
  <ul>
    {props.persons.map( person => < Person key={person.name} name={person.name} number={person.number} handleDeleteClick={() => props.handleDeleteClick(person.id)} />)}
  </ul>
)


export default People;