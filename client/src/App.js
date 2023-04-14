import './App.css';
import React, { useState, useEffect } from "react";
import PlanetList from './Components/PlanetList';
import FeatPlanet from './Components/FeatPlanet';
import StarWarsContext from './Components/StarWarsContext';
import AddPlanetForm from './Components/AddPlanetForm';

function App() {
  
  const [planets, setPlanets] = useState([]);
  const [featPlanet, setFeatPlanet] = useState(planets[0]);

  let starWarsObject = {planets, setPlanets, showPlanet, featPlanet}
 
   useEffect(() => {
    getPlanets();
  }, []);

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

  function showPlanet(url) {
    let featPlanet = planets.find(p => p.url === url);
    setFeatPlanet(featPlanet);
  }

  // async function addPlanet(planet) {
  //   try {
  //     const response = await fetch('/api/planets', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(planet)
  //     });
  //     console.log(response);
  //     if (response.ok) {
  //       const plan = await response.json();
  //       return plan;
  //     } else {
  //       console.log(`Server error: ${response.status} ${response.statusText}`);
  //     }
  //   } catch (err) {
  //     console.log(`Server error: ${err.message}`);
  //   }
  // }
  
  return (
    <div className="App">
      <h1>STAR WARS PLANETS</h1>

      <StarWarsContext.Provider value={starWarsObject}>
        <AddPlanetForm />
        <FeatPlanet />
        <PlanetList />
      </StarWarsContext.Provider>
    </div>
  );
}

export default App;
