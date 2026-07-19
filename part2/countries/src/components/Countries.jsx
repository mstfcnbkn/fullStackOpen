import CountryView from "./CountryView";

const Countries = ({ countries, selectCountry }) => {
  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  if (countries.length === 1) {
    return <CountryView country={countries[0]} />;
  }

  return countries.map((c) => (
    <div key={c.name.common}>
      {c.name.common}{" "}
      <button onClick={() => selectCountry(c.name.common)}>Show</button>
    </div>
  ));
};

export default Countries;
