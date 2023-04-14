import React, { useContext, useState} from 'react';
import StarWarsContext from './StarWarsContext';

function PlanetList() {

const {planets, setPlanets, showPlanet} = useContext(StarWarsContext);
const [editPlanet, setEditPlanet] = useState(null);

const handleDelete = (url) => {
    const newPlanets = planets.filter(p => p.url !== url);
    setPlanets(newPlanets);
  };

  const handleEdit = (planet) => {
    setEditPlanet(planet);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const updatedPlanet = {
      ...editPlanet,
      name: event.target.name.value,
      climate: event.target.climate.value,
      terrain: event.target.terrain.value
    };
    const updatedPlanets = planets.map(p => p.url === updatedPlanet.url ? updatedPlanet : p);
    setPlanets(updatedPlanets);
    setEditPlanet(null);
  };

  return (
    <div className="PlanetList">

{planets.map(planet => (
        <div key={planet.url}>
          {editPlanet === planet ? (
            <form onSubmit={handleSave}>
              <input type="text" name="name" defaultValue={planet.name} />
              <input type="text" name="diameter" defaultValue={planet.diameter} />
              <input type="text" name="climate" defaultValue={planet.climate} />
              <input type="text" name="terrain" defaultValue={planet.terrain} />
              <input type="text" name="population" defaultValue={planet.population} />
              <button type="submit">Save</button>
            </form>
          ) : (
            <>
              <h2>{planet.name}</h2>
              <p>Diameter: {planet.diameter} km</p>
              <p>Climate: {planet.climate}</p>
              <p>Terrain: {planet.terrain}</p>
              <p>Population: {planet.population}</p>
              <button><a onClick={() => showPlanet(planet.url)}>READ MORE</a></button>
              <button onClick={() => handleEdit(planet)}>Edit</button>
              <button onClick={() => handleDelete(planet.url)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default PlanetList;

