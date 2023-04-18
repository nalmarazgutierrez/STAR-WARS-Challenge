import "./App.scss";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import PlanetList from "./Components/PlanetList";
import StarWarsContext from "./Components/StarWarsContext";
import AddPlanetForm from "./Components/AddPlanetForm";

function App() {
  const [planets, setPlanets] = useState([]);
  const [featPlanet, setFeatPlanet] = useState(planets[0]);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [editPlanet, setEditPlanet] = useState(null);

  let starWarsObject = {
    planets,
    setPlanets,
    showPlanet,
    featPlanet,
    setShowForm,
    setFormSubmitted,
    editPlanet,
    setEditPlanet,
  };

  useEffect(() => {
    getPlanets();
  }, []);

  //Fetch the API to get planets by deafult (only 10)
  async function getPlanets() {
    const url = "https://swapi.dev/api/planets/";

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPlanets(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  //Fetch ALL planets (60 in total), not only 10
  // async function getPlanets() {
  //   const url = "https://swapi.dev/api/planets/";
  //   let allPlanets = [];

  //   try {
  //     let next = url;
  //     while (next !== null) {
  //       const response = await fetch(next);
  //       const data = await response.json();
  //       allPlanets = allPlanets.concat(data.results);
  //       next = data.next;
  //     }
  //     setPlanets(allPlanets);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  //Show more info of the planet when clicking on the button +INFO
  function showPlanet(url) {
    let featPlanet = planets.find((p) => p.url === url);
    setFeatPlanet(featPlanet);
  }

  //Show the AddPlanetForm only when clicking on the button +NEW PLANET
  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <div className="App">
      <div className="header">
        <div>
          <h1>
            <a href="/">STAR WARS Manager</a>
          </h1>
          <button className="HeaderButton" onClick={handleButtonClick}>
            + NEW PLANET
          </button>
        </div>
      </div>

      <StarWarsContext.Provider value={starWarsObject}>
        {showForm && !formSubmitted && <AddPlanetForm />}
        <PlanetList />
      </StarWarsContext.Provider>
    </div>
  );
}

export default App;
