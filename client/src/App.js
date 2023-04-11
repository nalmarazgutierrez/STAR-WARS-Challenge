import './App.css';
import React, { useState, useEffect } from "react";
import PlanetList from './Components/PlanetList';
import FeatPlanet from './Components/FeatPlanet';

function App() {
  
  const [planets, setPlanets] = useState([]);
  const [featPlanet, setFeatPlanet] = useState(planets[0]);

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

  return (
    <div className="App">
      <h1>STAR WARS PLANETS</h1>
      <FeatPlanet featPlanet={featPlanet} />
      <PlanetList planets={planets} showPlanet={id => showPlanet(id)} />
    </div>
  );
}

export default App;
