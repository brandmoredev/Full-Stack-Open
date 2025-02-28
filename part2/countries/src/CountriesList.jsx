const CountriesList = ({ countriesList, onSelectCountry }) => {

  return (
    <div>
      {countriesList
        .map((country) => {
          return (
            <div key={country.name.common}>
              {country.name.common}
              {' '}
              <button onClick={() => onSelectCountry(country)}>show</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default CountriesList;
