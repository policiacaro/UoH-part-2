const Header = ({ name, curriculum }) => <><h1>{curriculum}</h1><h2>{name}</h2></> ;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => 
  <li>
    {part.name} {part.exercises}
  </li>;

const Content = ({ parts }) => 
  <div>
    <ul>
      {parts.map(part =>< Part key={part.id} part={part} />)}
    </ul>
    <p><strong>Total exercises: 
      { parts.reduce((accumulator, current) => 
        accumulator + current.exercises, 0,
      )}
    </strong></p>
  </div>;
  
const Course = ({ name, parts, id }) => {
  if (id === 1) {
    return (
    <>
      < Header curriculum={"Web Development curriculum"} />
      < Header name={name} />
      < Content parts={parts} />
    </>  
    )
  } else {
  
    return (
      <>
        < Header name={name} />
        < Content parts={parts} />
      </>  
    )
  }
};

export default Course;