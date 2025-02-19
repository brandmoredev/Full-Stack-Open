import { useState } from 'react'

const Heading = ({ title }) => <h1>{title}</h1>

const Button = ({ feedback, onClick}) => <button onClick={onClick}>{feedback}</button>

const Details = ({ field, value }) => <p>{field} {value}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)
  const total = good + neutral + bad
  const average = total / 3
  const positive = (good / total) * 100

  return (
    <div>
      <Heading title="Give Feedback"/>
      <Button feedback="good" onClick={handleClickGood} />
      <Button feedback="neutral" onClick={handleClickNeutral}/>
      <Button feedback="bad" onClick={handleClickBad}/>
      <Heading title="Statistics"/>
      <Details field="Good" value={good}/>
      <Details field="Neutral" value={neutral}/>
      <Details field="Bad" value={bad}/>
      <Details field="Total" value={total}/>
      <Details field="Average" value={average}/>
      <Details field="Positive" value={`${positive} %`}/>
    </div>
  )
}

export default App
