import React, { useState, useEffect, useContext } from "react";
import StarWarsContext from "./StarWarsContext";
import "./FeatPlanet.scss";

function FeatPlanet() {
  const { featPlanet, editPlanet, setEditPlanet } = useContext(StarWarsContext);
  const [residents, setResidents] = useState([]);

  //Fetch the residents of each planet from de API
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
    return <div></div>;
  }

  return (
    <div key={featPlanet.url} className="FeatPlanet card">
      <div className="featDiv">
        <h3>{featPlanet.name}</h3>
        <p>
          <b>Diameter:</b> {featPlanet.diameter} km
        </p>
        <p>
          <b>Climate:</b> {featPlanet.climate}
        </p>
        <p>
          <b>Terrain:</b> {featPlanet.terrain}
        </p>
        <p>
          <b>Population:</b> {featPlanet.population}
        </p>
      </div>

      <div className="featDiv">
        <h3>Residents:</h3>
        {residents.map((r, index) => (
          <p key={index}>{r}</p>
        ))}
      </div>
    </div>
  );
}

export default FeatPlanet;
