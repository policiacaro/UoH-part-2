const Person = ({ name, number, handleDeleteClick}) => {
  
  if (number === "null") {
    return (
      <li>
        No Entries Found
      </li>
    );
  } else if (number != "null") {
    //console.log("search is not null", props);
    
    return (
        <li>
          Name: {name} -- Number: {number} 
           | <button type="button" onClick={handleDeleteClick}>
            Delete
          </button>
        </li>
    );
  }
}

export default Person;