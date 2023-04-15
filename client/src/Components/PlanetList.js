import React, { useContext, useState } from 'react';
import StarWarsContext from './StarWarsContext';
import SortBy from './SortBy';

function PlanetList() {
  const { planets, setPlanets, showPlanet } = useContext(StarWarsContext);
  const [editPlanet, setEditPlanet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

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
      diameter: event.target.diameter.value,
      climate: event.target.climate.value,
      terrain: event.target.terrain.value,
      population: event.target.population.value
    };
    const updatedPlanets = planets.map(p => p.url === updatedPlanet.url ? updatedPlanet : p);
    setPlanets(updatedPlanets);
    setEditPlanet(null);
  };

  const searchPlanets = (term) => {
    if (term === '') {
      return planets;
    } else {
      return planets.filter(planet => (
        planet.name.toLowerCase().includes(term.toLowerCase()) ||
        planet.climate.toLowerCase().includes(term.toLowerCase()) ||
        planet.terrain.toLowerCase().includes(term.toLowerCase())
      ));
    }
  }

  const searchResults = searchPlanets(searchTerm);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortResults = (results) => {
    if (sortKey === 'name') {
      results.sort((a, b) => {
        return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      });
    } else if (sortKey === 'diameter') {
      results.sort((a, b) => {
        return sortAsc ? a.diameter - b.diameter : b.diameter - a.diameter;
      });
    } else if (sortKey === 'climate') {
      results.sort((a, b) => {
        return sortAsc ? a.climate.localeCompare(b.climate) : b.climate.localeCompare(a.climate);
      });
    } else if (sortKey === 'terrain') {
      results.sort((a, b) => {
        return sortAsc ? a.terrain.localeCompare(b.terrain) : b.terrain.localeCompare(a.terrain);
      });
    } else if (sortKey === 'population') {
      results.sort((a, b) => {
        return sortAsc ? a.population - b.population : b.population - a.population;
      });
    }
    return results;
  };

  return (
    <div className="PlanetList">
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Search:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </form>
      <SortBy onSort={handleSort} />
      {sortResults(searchResults).map(planet => (
        <div key={planet.url}>
          {editPlanet === planet ? (
            <form onSubmit={handleSave}>
            <label>
            Name:
            <input type="text" defaultValue={planet.name} name="name" />
            </label>
            <label>
            Diameter:
            <input type="number" defaultValue={planet.diameter} name="diameter" />
            </label>
            <label>
            Climate:
            <input type="text" defaultValue={planet.climate} name="climate" />
            </label>
            <label>
            Terrain:
            <input type="text" defaultValue={planet.terrain} name="terrain" />
            </label>
            <label>
            Population:
            <input type="number" defaultValue={planet.population} name="population" />
            </label>
            <button type="submit">Save</button>
            <button onClick={() => setEditPlanet(null)}>Cancel</button>
            </form>
            ) : (
            <div onClick={() => showPlanet(planet)}>
            <h2>{planet.name}</h2>
            <p>Diameter: {planet.diameter}</p>
            <p>Climate: {planet.climate}</p>
            <p>Terrain: {planet.terrain}</p>
            <p>Population: {planet.population}</p>
            <button onClick={() => handleEdit(planet)}>Edit</button>
            <button onClick={() => handleDelete(planet.url)}>Delete</button>
            </div>
            )}
            </div>
            ))}
            </div>
            );
            }
            
            export default PlanetList;
            
            
            
            
            




// import React, { useContext, useState} from 'react';
// import StarWarsContext from './StarWarsContext';
// import SortBy from './SortBy';

// function PlanetList() {

// const {planets, setPlanets, showPlanet} = useContext(StarWarsContext);
// const [editPlanet, setEditPlanet] = useState(null);

// const handleDelete = (url) => {
//     const newPlanets = planets.filter(p => p.url !== url);
//     setPlanets(newPlanets);
//   };

//   const handleEdit = (planet) => {
//     setEditPlanet(planet);
//   };

//   const handleSave = (event) => {
//     event.preventDefault();
//     const updatedPlanet = {
//       ...editPlanet,
//       name: event.target.name.value,
//       climate: event.target.climate.value,
//       terrain: event.target.terrain.value
//     };
//     const updatedPlanets = planets.map(p => p.url === updatedPlanet.url ? updatedPlanet : p);
//     setPlanets(updatedPlanets);
//     setEditPlanet(null);
//   };

//   return (
//     <div className="PlanetList">
//       <SortBy />
//       {planets.map(planet => (
//         <div key={planet.url}>
//           {editPlanet === planet ? (
//             <form onSubmit={handleSave}>
//               <input type="text" name="name" defaultValue={planet.name} />
//               <input type="text" name="diameter" defaultValue={planet.diameter} />
//               <input type="text" name="climate" defaultValue={planet.climate} />
//               <input type="text" name="terrain" defaultValue={planet.terrain} />
//               <input type="text" name="population" defaultValue={planet.population} />
//               <button type="submit">Save</button>
//             </form>
//           ) : (
//             <>
//               <h2>{planet.name}</h2>
//               <p>Diameter: {planet.diameter} km</p>
//               <p>Climate: {planet.climate}</p>
//               <p>Terrain: {planet.terrain}</p>
//               <p>Population: {planet.population}</p>
//               <button><a onClick={() => showPlanet(planet.url)}>READ
//               </a></button>
// <button onClick={() => handleEdit(planet)}>Edit</button>
// <button onClick={() => handleDelete(planet.url)}>Delete</button>
// </>
// )}
// </div>
// ))}
// </div>
// );
// }

// export default PlanetList;









// import React, { useContext, useState} from 'react';
// import StarWarsContext from './StarWarsContext';

// function PlanetList() {

//   const {planets, setPlanets, showPlanet} = useContext(StarWarsContext);
//   const [editPlanet, setEditPlanet] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleDelete = (url) => {
//     const newPlanets = planets.filter(p => p.url !== url);
//     setPlanets(newPlanets);
//   };

//   const handleEdit = (planet) => {
//     setEditPlanet(planet);
//   };

//   const handleSave = (event) => {
//     event.preventDefault();
//     const updatedPlanet = {
//       ...editPlanet,
//       name: event.target.name.value,
//       climate: event.target.climate.value,
//       terrain: event.target.terrain.value
//     };
//     const updatedPlanets = planets.map(p => p.url === updatedPlanet.url ? updatedPlanet : p);
//     setPlanets(updatedPlanets);
//     setEditPlanet(null);
//   };

//   const searchPlanets = (term) => {
//     if (term === '') {
//       return planets;
//     } else {
//       return planets.filter(planet => (
//         planet.name.toLowerCase().includes(term.toLowerCase()) ||
//         planet.climate.toLowerCase().includes(term.toLowerCase()) ||
//         planet.terrain.toLowerCase().includes(term.toLowerCase())
//       ));
//     }
//   }

//   const searchResults = searchPlanets(searchTerm);

//   return (
//     <div className="PlanetList">
//       <form onSubmit={(e) => e.preventDefault()}>
//         <label>
//           Search:
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </label>
//       </form>

//       {searchResults.map(planet => (
//         <div key={planet.url}>
//           {editPlanet === planet ? (
//             <form onSubmit={handleSave}>
//               <input type="text" name="name" defaultValue={planet.name} />
//               <input type="text" name="diameter" defaultValue={planet.diameter} />
//               <input type="text" name="climate" defaultValue={planet.climate} />
//               <input type="text" name="terrain" defaultValue={planet.terrain} />
//               <input type="text" name="population" defaultValue={planet.population} />
//               <button type="submit">Save</button>
//             </form>
//           ) : (
//             <>
//               <h2>{planet.name}</h2>
//               <p>Diameter: {planet.diameter} km</p>
//               <p>Climate: {planet.climate}</p>
//               <p>Terrain: {planet.terrain}</p>
//               <p>Population: {planet.population}</p>
//               <button><a onClick={() => showPlanet(planet.url)}>READ MORE</a></button>
//               <button onClick={() => handleEdit(planet)}>Edit</button>
//               <button onClick={() => handleDelete(planet.url)}>Delete</button>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default PlanetList;