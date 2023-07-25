import './App.css';
import Course from './Course.js';

const App = () => {
  const courses = [
  {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'super bungus',
        exercises: 41,
        id: 4
      },
      {
        name: 'wumpus house',
        exercises: 1,
        id: 5
      },
      {
        name: 'glorple stomp',
        exercises: 4,
        id: 6
      }
    ]
  },
  {
    id: 2,
    name: "Node.js",
    parts: [
      {
        name: "Routing",
        exercises: 3,
        id: 1
      },
      {
        name: "Middlewares",
        exercises: 7,
        id: 2
      },
      {
        name: "Super Duper",
        exercises: 5,
        id: 3
      }
    ]
  },
  {
    id: 3,
    name: "Hacking the Mainframe",
    parts: [
    {
      name: "Cut the hardline",
      exercises: 10,
      id: 1
    },
    {
      name: "Rewrite the GUI",
      exercises: 5,
      id: 2
    },
    {
      name: "Delete the firewall",
      exercises: 5,
      id: 3
    },
    {
      name: "Re-confirm the firmware",
      exercises: 1,
      id: 4
    }
    ]
  }
  ]

  return (
    courses.map(course => 
      < Course name={course.name} parts={course.parts} key={course.id} id={course.id} />
    )
  );
};

export default App;