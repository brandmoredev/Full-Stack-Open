import { useEffect, useState } from "react";
import countries from "./services/countries";
import CountryDetail from "./CountryDetail";
import CountriesList from "./CountriesList";
import Filter from "./FilterCountries";

const App = () => {
  const [input, setInput] = useState('');
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countries
    .getFilteredCountries(input)
    .then((response) => {
      setCountriesList(response)
    })
  }, [input])

  const handleInputChange = (e) => {
    selectedCountry && setSelectedCountry(null)
    setInput(e.target.value)
  }

  const handleShowCountry = (country) => {
    console.log('handleShowCountry', country)
    setSelectedCountry(country)
  }

  return (
    <div>
      <Filter input={input} onChange={handleInputChange} />
      {
        selectedCountry
        ? <CountryDetail country={selectedCountry} />
        : countriesList.length > 10 ? (
          <div>Too many matches, specify another filter</div>
        ) : countriesList.length === 1 ? (
          <CountryDetail country={countriesList[0]} />
        ) : countriesList.length > 1 ? (
          <CountriesList countriesList={countriesList} onSelectCountry={handleShowCountry}/>
        ) : null
      }
      {

      }
    </div>
  )
}

export default App;
