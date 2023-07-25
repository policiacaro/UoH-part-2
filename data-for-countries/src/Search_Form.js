const Search_Form = (props) => {
  return (
    <form onSubmit={props.searchClick}>
      <input type="text" id="search_bar" required minLength="1" onChange={props.handleSearchInputChange} />
      <input type="submit" id="form_submit" value="Search" />
    </form>
  );
}

export default Search_Form;