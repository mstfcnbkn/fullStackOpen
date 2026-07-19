import { useState, useEffect } from "react";
import countryService from "./services/countries";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    countryService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const searchedCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(newSearch.toLowerCase()),
  );

  const selectCountry = (countryName) => {
    setNewSearch(countryName);
  };

  const handleSearchChange = (event) => setNewSearch(event.target.value);

  return (
    <div>
      <div className="inputDiv">
        <p className="findCountries">find countries</p>
        <input value={newSearch} onChange={handleSearchChange} />
      </div>
      <Countries countries={searchedCountries} selectCountry={selectCountry} />
    </div>
  );
};

export default App;
