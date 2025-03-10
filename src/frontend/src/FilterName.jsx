const Filter = ({ filterName,  onFilterChange}) => {
  return (
    <div>
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
