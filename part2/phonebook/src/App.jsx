import { useState } from 'react'
import Filter from './FilterName'
import PersonForm from './PersonForm'
import Persons from './Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleInputNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleInputNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleInputFilterChange = (e) => {
    setFilterName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const nameExists = persons.some(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase());

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({ name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <Filter filterName={filterName} onFilterChange={handleInputFilterChange}/>
      <PersonForm
        onClick={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleInputNameChange={handleInputNameChange}
        handleInputNumberChange={handleInputNumberChange}
      />
      <Persons persons={persons} filterName={filterName}/>
    </div>
  )
}

export default App
