import React, { useContext, useState } from 'react';
import StarWarsContext from './StarWarsContext';
import PlanetList from './PlanetList';

function PlanetSearch() {
  const { planets } = useContext(StarWarsContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSearchBy(event.target.value);
  };

  const filteredPlanets = planets.filter((planet) => {
    if (searchTerm === '') {
      return true;
    }
    if (searchBy === 'name') {
      return planet.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (searchBy === 'climate') {
      return planet.climate.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (searchBy === 'terrain') {
      return planet.terrain.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  return (
    <div className="PlanetSearch">
      <h2>Search for a planet</h2>
      <label>
        Search By:
        <select value={searchBy} onChange={handleSelectChange}>
          <option value="name">Name</option>
          <option value="climate">Climate</option>
          <option value="terrain">Terrain</option>
        </select>
      </label>
      <br />
      <label>
        Search Term:
        <input type="text" value={searchTerm} onChange={handleInputChange} />
      </label>
      <br />
      <PlanetList planets={filteredPlanets} />
    </div>
  );
}

export default PlanetSearch;
