import React, { useState, useEffect } from 'react';

function PlanetList() {

  const [planets, setPlanets] = useState([]);

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

  return (
    <div className="PlanetList">
      {
        planets.map(planet => (
          <p key={planet.name}>{planet.name}</p>
        ))
      }
    </div>
  );
}

export default PlanetList;