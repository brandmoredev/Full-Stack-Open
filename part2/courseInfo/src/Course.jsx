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
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <p><strong>Number of exercises {total}</strong></p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course;