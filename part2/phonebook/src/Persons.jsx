const Persons = ({ persons, filterName }) => {
  return (
    <>
      <h2>Numbers</h2>
      {
        persons
          .filter(person => person.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase()))
          .map((person, index) => <div key={index}>{person.name} {person.number}</div>)
      }
    </>
  )
}

export default Persons;
