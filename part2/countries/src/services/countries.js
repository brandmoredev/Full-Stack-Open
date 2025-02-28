import axios from "axios";
const BASE_URL = "https://studies.cs.helsinki.fi/restcountries";

const getAll = () => {
  return axios.get(`${BASE_URL}/api/all`).then((response) => response.data)
}

const getFilteredCountries = (name) => {
  const response = getAll()
    .then((countries) => {
      return countries.filter((country) => {
        return country.name.common.toLowerCase().includes(name.toLowerCase())
      })
    })

  return response;
}

const getCountry = (name) => {
  return axios.get(`${BASE_URL}/api/name/${name}`).then((response) => response.data)
}

export default { getAll, getFilteredCountries, getCountry };
