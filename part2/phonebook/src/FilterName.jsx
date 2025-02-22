const Filter = ({ filterName,  onFilterChange}) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter Shown With:
        <input
          value={filterName}
          onChange={onFilterChange}
        />
      </div>
    </div>
  )
}

export default Filter;
