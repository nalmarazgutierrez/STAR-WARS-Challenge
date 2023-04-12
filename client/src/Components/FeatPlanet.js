import React, { useState, useEffect, useContext } from "react";
import StarWarsContext from "./StarWarsContext";

function FeatPlanet() {
  const { featPlanet } = useContext(StarWarsContext);
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    async function getResidents() {
      try {
        const promises = featPlanet.residents.map(async (resident) => {
          const response = await fetch(resident);
          if (!response.ok) {
            throw new Error("Failed to fetch data from API");
          }
          const data = await response.json();
          return data.name;
        });
        const results = await Promise.all(promises);
        setResidents(results);
      } catch (error) {
        console.error(error);
      }
    }

    if (featPlanet) {
      getResidents();
    }
  }, [featPlanet]);

  if (!featPlanet) {
    return <div>Click on a planet to show more information</div>;
  }

  return (
    <div className="FeatPlanet">
      <div>
        <h2>{featPlanet.name}</h2>
        <p>Diameter: {featPlanet.diameter} km</p>
        <p>Climate: {featPlanet.climate}</p>
        <p>Terrain: {featPlanet.terrain}</p>
        <p>Population: {featPlanet.population}</p>
        Residents:
        {residents.map((r, index) => (
          <p key={index}>{r}</p>
        ))}
      </div>
    </div>
  );
}

export default FeatPlanet;
