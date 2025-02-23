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
      const updatePhonebook = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (updatePhonebook) {
        const person = persons.find(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())
        const updatedPerson = { ...person, number: newNumber }

        phonebook
          .update(person.id, updatedPerson)
          .then(returnedData => {
            setPersons(persons.map(person => person.id !== returnedData.id ? person : returnedData))
            setNewName('')
            setNewNumber('')
          })
      }
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

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name} ?`)

    if (confirmDelete) {
      phonebook
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
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
      <Persons persons={persons} filterName={filterName} onDelete={handleDelete}/>
    </div>
  )
}

export default App
