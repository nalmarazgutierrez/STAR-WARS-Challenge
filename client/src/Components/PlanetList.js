import React, { useContext } from 'react';
import StarWarsContext from './StarWarsContext';

function PlanetList() {

const {planets, setPlanets, showPlanet} = useContext(StarWarsContext);

  return (
    <div className="PlanetList">
      {
        planets.map(p => (
         <div key={p.url}>
          <h2>{p.name}</h2>
          <p>Diameter: {p.diameter} km</p>
          <p>Climate: {p.climate}</p>
          <p>Terrain: {p.terrain}</p>
          <p>Population: {p.population}</p>
         <a onClick={() => showPlanet(p.url)}>READ MORE</a>
         </div>
        ))
      }
    </div>
  );
}

export default PlanetList;

