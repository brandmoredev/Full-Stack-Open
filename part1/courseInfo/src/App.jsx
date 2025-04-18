const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return parts.map((part, index) => {
    return <Part part={part.name} exercises={part.exercises} key={index}/>
  })
}

const Total = ({ parts }) => {
  return (
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const { name, parts } = course

  return (
    <div>
      <Header course={name}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App;
