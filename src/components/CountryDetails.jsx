import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function CountryDetails({ countries }) {
  let { id } = useParams();

  if (!id) {
    id = "TUR";
  }

  const [idCountry, setIdCountry] = useState([]);

  useEffect(() => {
    getIdData(id);
  }, [id]);

  async function getIdData(searchId) {
    try {
      const response = await axios.get(
        `https://ih-countries-api.herokuapp.com/countries/${searchId}`
      );
      setIdCountry(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  if (idCountry.length || countries.length === 0) {
    return <div></div>;
  }

  function countryFilter(countriesArr, filterId) {
    if (countriesArr.length === 0) {
      return [];
    } else if (!filterId) {
      const [country] = countriesArr.filter(
        (country) => country.alpha3Code === "ABW"
      );
      return country;
    } else {
      const [country] = countriesArr.filter(
        (country) => country.alpha3Code === filterId
      );

      return country;
    }
  }

  //   const country = countryFilter(countries, id);

  return (
    <div className="col-7">
      <img
        src={
          "https://flagpedia.net/data/flags/icon/72x54/" +
          idCountry.alpha2Code.toLowerCase() +
          ".png"
        }
        alt={"flag-of-" + idCountry.name.common}
      />
      <h1>{idCountry.name.common}</h1>
      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{ width: "30%" }}>Capital</td>
            <td>{idCountry.capital}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              {idCountry.area} km
              <sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul>
                {idCountry.borders.map((borderCountry) => (
                  <li key={borderCountry + "-" + idCountry.name.common}>
                    <Link to={"/" + borderCountry}>
                      {countryFilter(countries, borderCountry).name.common}
                    </Link>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CountryDetails;
