function Error_Display(errorNum, errorObj = '') {
  //console.log("error data: ", errorNum, errorObj);
  switch (errorNum) {
    case 0:
      return `ERROR 0: "${errorObj.name}" person already exists. Cannot be added to Phonebook.`
      break;
    case 1:
      return `ERROR 1: Name field cannot be empty.`;
      break;
    case 2:
      return `ERROR 2: Existing phone number cannot be added again.`;
      break;
    default:
      return `An error has occured.`;
      break;
  }
}

export default Error_Display;