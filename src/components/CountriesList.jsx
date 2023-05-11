import { Link } from "react-router-dom";

function CountriesList({ countries }) {
  function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  return (
    <div className="col-5" style={{ maxHeight: "90vh", overflow: "scroll" }}>
      <div className="list-group">
        {countries.map((country) => (
          <Link
            key={country.name.common}
            className="list-group-item list-group-item-action"
            to={"/" + country.alpha3Code}
          >
            {getFlagEmoji(country.alpha2Code)} {country.name.common}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CountriesList;
