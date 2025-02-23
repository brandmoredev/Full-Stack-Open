import { useEffect, useState } from 'react'
import Filter from './FilterName'
import PersonForm from './PersonForm'
import Persons from './Persons'
import phonebook from './services/phonebook'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    phonebook
      .getAll()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
      })
  }
  , [])

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

    phonebook
      .create({ name: newName, number: newNumber})
      .then(returnedData => {
        setPersons(persons.concat(returnedData))
        setNewName('')
        setNewNumber('')
      })

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
