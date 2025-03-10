import { useState } from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Anecdote = ({ text, voteCount }) => (
  <>
    <p>{text}</p>
    <p>has {voteCount} votes</p>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const mostVotes = votes.findIndex(vote => vote === Math.max(...votes))

  const handleClickNext = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    const index = randomIndex === selected ? randomIndex - 1 : randomIndex
    setSelected(index)
  }

  const handleClickVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Header title="Anecdote of the Day" />
      <Anecdote text={anecdotes[selected]} voteCount={votes[selected]}/>
      <div>
        <button onClick={handleClickVote}>Vote</button>
        <button onClick={handleClickNext}>Next Anecdote</button>
      </div>
      <Header title="Anecdote with most votes" />
      <p>{anecdotes[mostVotes]}</p>
    </div>
  )
}

export default App