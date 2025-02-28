const Filter = ({ input, onChange }) => {
  return (
    <div>
      <span>Find Countries </span>
      <input
        type="text"
        value={input}
        onChange={onChange}
      />
    </div>
  )
}

export default Filter;
