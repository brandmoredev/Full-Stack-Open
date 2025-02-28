import { useEffect, useState } from "react";
import countries from "./services/countries";
import CountryDetail from "./CountryDetail";
import CountriesList from "./CountriesList";
import Filter from "./FilterCountries";

const App = () => {
  const [input, setInput] = useState('');
  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    countries
    .getFilteredCountries(input)
    .then((response) => {
      setCountriesList(response)
    })
  }, [input])

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  return (
    <div>
      <Filter input={input} onChange={handleInputChange} />
      {countriesList.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : countriesList.length === 1 ? (
        <CountryDetail country={countriesList[0]} />
      ) : countriesList.length > 1 ? (
        <CountriesList countriesList={countriesList} />
      ) : null}
    </div>
  )
}

export default App;
