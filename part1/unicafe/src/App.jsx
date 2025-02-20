import { useState } from 'react'

const Heading = ({ title }) => <h1>{title}</h1>

const Button = ({ feedback, onClick}) => <button onClick={onClick}>{feedback}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (total / 3).toFixed(2)
  const positive = ((good / total) * 100).toFixed(2)

  return (
    <>
      <Heading title="Statistics"/>
      { (good == 0 && neutral == 0 && bad == 0) ?
        <p>No feedback given</p> :
        <table>
          <tbody>
            <StatisticLine text="Good" value={good}/>
            <StatisticLine text="Neutral" value={neutral}/>
            <StatisticLine text="Bad" value={bad}/>
            <StatisticLine text="Total" value={total}/>
            <StatisticLine text="Average" value={average}/>
            <StatisticLine text="Positive" value={`${positive} %`}/>
          </tbody>
        </table>
      }
    </>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App
