const CountriesList = ({ countriesList }) => {
  return (
    <div>
      {countriesList
        .map((country) => {
          return <div key={country.name.common}>{country.name.common}</div>
        })
      }
    </div>
  )
}

export default CountriesList;
