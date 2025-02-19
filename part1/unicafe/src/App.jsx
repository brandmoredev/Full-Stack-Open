import { useState } from 'react'

const Heading = ({ title }) => <h1>{title}</h1>

const Button = ({ feedback, onClick}) => <button onClick={onClick}>{feedback}</button>

const Details = ({ selection, count }) => <p>{selection} {count}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)

  return (
    <div>
      <Heading title="Give Feedback"/>
      <Button feedback="good" onClick={handleClickGood} />
      <Button feedback="neutral" onClick={handleClickNeutral}/>
      <Button feedback="bad" onClick={handleClickBad}/>
      <Heading title="Statistics"/>
      <Details selection="Good" count={good}/>
      <Details selection="Neutral" count={neutral}/>
      <Details selection="Bad" count={bad}/>
    </div>
  )
}

export default App
