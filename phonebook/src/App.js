import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import peopleService from './services/Persons';
import Person from './Person.js';
import People from './People.js';
import Add_Entry from './Add_Entry.js';
import Filter_Results from './Filter_Results.js';
import Error_Display from './Error_Display.js';
import Notification from './Notification.js';

const App = () => {
  
  const [persons, setPersons] = useState([]); 
  const [results, setResults] = useState([]);
  
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [noticeMessage, setNoticeMessage] = useState(null);
  
  useEffect(() => {
    peopleService
      .allPeople()
      .then(response => setPersons(response));
  }, []);
  
  function SameNameFlag(personArray) {
    let check = personArray.find(person => person.name === newName );
    /*
    if (check === undefined) return false;
    else return true;
    */
    return check === undefined ? false : true;
  }
  
  function SameNumberFlag(personArray) {
    let check = personArray.find(person => person.name === newName);
    //console.log("checking same number: ", check);
    //return check.number === newNumber ? true : false;
    //if (check.number === newNumber) return true;
    //return false;
    
    if (check === undefined) return false;
    else if (check.number === newNumber) return true;
    //else return false;
    
    //return check === undefined ? false : true;
  }
  
  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };
    let oldPerson = persons.filter(person => person.name === newName);
    //console.log("debugging oldPerson: ", oldPerson);
    //console.log("debugging newPerson: ", newPerson);
    //console.log("persons array: ", persons);
    if (newName.length <= 0 || newName === " ") return window.alert(Error_Display(1));
    if (!SameNameFlag(persons)) {
      if (SameNumberFlag(persons) && newNumber != oldPerson[0].number) {
        return window.alert(Error_Display(2));
      }
      peopleService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response));
          setNewName('');
          setNewNumber('');
        })
      setNoticeMessage(`${newName} has been added.`);
      setTimeout(() => {
        setNoticeMessage(null);
      }, 5000);
    }
    else if (!SameNumberFlag(persons)) {
      if (window.confirm(`Would you like to update the phone number of ${newName} from ${oldPerson[0].number} to ${newNumber}?`)) {
        oldPerson[0].number = newNumber;
        peopleService
          .update(oldPerson[0])
          .then(response => {
            //console.log("inside number change response: ", response);
            //setPersons(persons);
            setNewName('');
            setNewNumber('');
            //console.log("after change/add: ", persons);
            setNoticeMessage(`${newName}'s number has been changed to ${newNumber}.`);
            setTimeout(() => {
              setNoticeMessage(null);
            }, 5000);
          })
          .catch(error => {
            //console.log("the requested person has already been deleted from the server");
            setErrorMessage(`${newName} has already been deleted from the server.`);
            setTimeout (() => {
              setErrorMessage(null);
            }, 5000);
//TODO: reset the state of the persons array but exclude the person that was causing error.----------------------------------------------------------------------------------------------------------------            
//TODO: resest name and number fields after deletion and error.----------------------------------------------------------------------------------------------------------------
          })
      }
    }
    
    else {
      window.alert(Error_Display(0, newPerson));
    }
  }
  
  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  }
  
  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  }
  
  const handleSearchInputChange = (event) => {
    setNewSearch(event.target.value);
  }
  
  const handleDeleteClick = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if (window.confirm(`Do you really want to delete ${personToDelete.name}?`)){
      peopleService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          //alert(`delete request for ${persons[id]} failed`);
          setErrorMessage(`${persons[id]} has already been deleted from the server.`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter(person => person.id !== id));
//TODO: resest name and number fields after deletion and error.----------------------------------------------------------------------------------------------------------------
        })
    }
    setErrorMessage(`${personToDelete.name} has been deleted.`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000)
//TODO: resest name and number fields after deletion and error.----------------------------------------------------------------------------------------------------------------
  }
  
  
  const handleSearchClick = () => {
    const emptySearch = {
      name: "",
      number: "null"
    };
      let searchResults = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()));
    if(newSearch.length === 0 || newSearch === " " || searchResults.length === 0) {
      setResults([emptySearch]);
    }
    else {
      setResults(searchResults);
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      < Filter_Results newSearch={newSearch} results={results} handleSearchInputChange={handleSearchInputChange} handleSearchClick={handleSearchClick} />
      < Notification message={noticeMessage} type='notice' />
      < Notification message={errorMessage} type='error' />
      < Add_Entry newName={newName} handleNameInputChange={handleNameInputChange} newNumber={newNumber} handleNumberInputChange={handleNumberInputChange} addName={addName} />
      <h2>Numbers</h2>
      < People persons={persons} handleDeleteClick={handleDeleteClick} />
    </div>
  )
}
export default App;