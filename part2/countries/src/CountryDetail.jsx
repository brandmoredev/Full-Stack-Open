const CountryDetail = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital[0]}</div>
      <div>Population: {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => {
          return <li key={language}>{language}</li>
        })}
      </ul>
      <img src={country.flags.png} alt={country.name.common} width="100" />
    </div>
  )
}

export default CountryDetail;
