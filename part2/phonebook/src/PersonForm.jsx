const PersonForm = ({
  newName,
  newNumber,
  handleInputNameChange,
  handleInputNumberChange,
  onClick
}) => {
  return(
    <>
      <h2>Add a new</h2>
      <form>
        <div>
          Name:
          <input
            value={newName}
            onChange={handleInputNameChange}
          />
        </div>
        <div>
          Number:
          <input
            value={newNumber}
            onChange={handleInputNumberChange}
          />
        </div>
        <div>
          <button onClick={onClick}>add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm;
