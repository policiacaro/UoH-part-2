const Add_Entry = (props) => (
  <form onSubmit={props.addName}>
    <h3>Add An Entry</h3>
    <div className="flexbox">
      Name: <input value={props.newName} onChange={props.handleNameInputChange} />
      Number: < input value={props.newNumber} onChange={props.handleNumberInputChange} />
      <button type="submit">Add Person</button>
    </div>
  </form>
)

export default Add_Entry;