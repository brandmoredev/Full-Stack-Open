const Persons = ({ persons, filterName, onDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      {
        persons
          .filter(person => person.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase()))
          .map((person, index) => (
            <div key={index}>
              {person.name} {person.number}
              <button onClick={() => onDelete(person.id)}>delete</button>
            </div>)
          )
      }
    </>
  )
}

export default Persons;
