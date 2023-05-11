import "./App.css";
import countriesJson from "./countries.json";
import { useState, useEffect } from "react";
import NavBar from "./components/Navbar";
import CountriesList from "./components/CountriesList";
import { Route, Routes } from "react-router-dom";
import CountryDetails from "./components/CountryDetails";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await axios.get(
        "https://ih-countries-api.herokuapp.com/countries"
      );
      setCountries(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <div className="row">
          <CountriesList countries={countries} />
          <Routes>
            <Route
              path="/"
              element={<CountryDetails countries={countries} />}
            />
            <Route
              path="/:id"
              element={<CountryDetails countries={countries} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default App;
