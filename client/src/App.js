import './App.css';
import React, { useState, useEffect } from "react";
import PlanetList from './Components/PlanetList';
import FeatPlanet from './Components/FeatPlanet';
import StarWarsContext from './Components/StarWarsContext';

const EMPTY_PLANET = {
  name: ''
};

function App() {
  
  const [planets, setPlanets] = useState([]);
  const [featPlanet, setFeatPlanet] = useState(planets[0]);
  const [newPlanet, setNewPlanet] = useState(EMPTY_PLANET);

  let starWarsObject = {planets, setPlanets, showPlanet, featPlanet, newPlanet, setNewPlanet, addPlanet}

  useEffect(() => {
    getPlanets('https://swapi.dev/api/planets/');
  }, []);

  async function getPlanets(url) {
    const response = await fetch(url);
    const data = await response.json();
    const newPlanets = data.results;
    setPlanets(prevPlanets => [...prevPlanets, ...newPlanets]);
    if (data.next) {
      getPlanets(data.next);
    }
  }

  function showPlanet(url) {
    let featPlanet = planets.find(p => p.url === url);
    setFeatPlanet(featPlanet);
  }

  async function addPlanet(planet) {
    try {
      const response = await fetch('/api/planets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(planet)
      });
      console.log(response);
      if (response.ok) {
        const plan = await response.json();
        return plan;
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }
  

  return (
    <div className="App">
      <h1>STAR WARS PLANETS</h1>

      <StarWarsContext.Provider value={starWarsObject}>
        <FeatPlanet />
        <PlanetList />
      </StarWarsContext.Provider>
    </div>
  );
}

export default App;
