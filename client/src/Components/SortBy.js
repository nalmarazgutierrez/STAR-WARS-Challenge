import React, { useState, useContext } from 'react';
import StarWarsContext from './StarWarsContext';

function SortBy() {
  const { planets, setPlanets } = useContext(StarWarsContext);
  const [sortProperty, setSortProperty] = useState('');

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSortProperty(value);

    const sortedPlanets = planets.sort((a, b) => {
      if (a[value] < b[value]) return -1;
      if (a[value] > b[value]) return 1;
      return 0;
    });
    setPlanets([...sortedPlanets]);
  };

  return (
    <div className="SortBy">
      <label htmlFor="sortProperty">Sort by:</label>
      <select className="form-select" name="sortProperty" value={sortProperty} onChange={handleSortChange}>
        <option value="">None</option>
        <option value="name">Name</option>
        <option value="diameter">Diameter</option>
        <option value="climate">Climate</option>
        <option value="terrain">Terrain</option>
        <option value="population">Population</option>
      </select>
    </div>
  );
}

export default SortBy;
