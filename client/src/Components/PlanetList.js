import React, { useContext, useState } from "react";
import StarWarsContext from "./StarWarsContext";
import SortBy from "./SortBy";
import "./PlanetList.scss";
import FeatPlanet from "./FeatPlanet";

function PlanetList() {
  const { planets, setPlanets, showPlanet, editPlanet, setEditPlanet } =
    useContext(StarWarsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  //Delete a planet from the State
  const handleDelete = (url) => {
    const newPlanets = planets.filter((p) => p.url !== url);
    setPlanets(newPlanets);
  };

  //Modify each planet's info
  const handleEdit = (planet) => {
    setEditPlanet(planet);
  };

  //Save new iplanet's info, update the State
  const handleSave = (event) => {
    event.preventDefault();
    const updatedPlanet = {
      ...editPlanet,
      name: event.target.name.value,
      diameter: event.target.diameter.value,
      climate: event.target.climate.value,
      terrain: event.target.terrain.value,
      population: event.target.population.value,
    };
    const updatedPlanets = planets.map((p) =>
      p.url === updatedPlanet.url ? updatedPlanet : p
    );
    setPlanets(updatedPlanets);
    setEditPlanet(null);
  };

  //Search planets by name, climate and terrain
  const searchPlanets = (term) => {
    if (term === "") {
      return planets;
    } else {
      return planets.filter(
        (planet) =>
          planet.name.toLowerCase().includes(term.toLowerCase()) ||
          planet.climate.toLowerCase().includes(term.toLowerCase()) ||
          planet.terrain.toLowerCase().includes(term.toLowerCase())
      );
    }
  };

  //Update the list of planets after searching
  const searchResults = searchPlanets(searchTerm);

  //Sort Planets by key
  // const handleSort = (key) => {
  //   if (sortKey === key) {
  //     setSortAsc(!sortAsc);
  //   } else {
  //     setSortKey(key);
  //     setSortAsc(true);
  //   }
  // };

  //Update the list of planets after sorting
  const sortResults = (results) => {
    if (sortKey === "name") {
      results.sort((a, b) => {
        return sortAsc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
    } else if (sortKey === "diameter") {
      results.sort((a, b) => {
        return sortAsc ? a.diameter - b.diameter : b.diameter - a.diameter;
      });
    } else if (sortKey === "climate") {
      results.sort((a, b) => {
        return sortAsc
          ? a.climate.localeCompare(b.climate)
          : b.climate.localeCompare(a.climate);
      });
    } else if (sortKey === "terrain") {
      results.sort((a, b) => {
        return sortAsc
          ? a.terrain.localeCompare(b.terrain)
          : b.terrain.localeCompare(a.terrain);
      });
    } else if (sortKey === "population") {
      results.sort((a, b) => {
        return sortAsc
          ? a.population - b.population
          : b.population - a.population;
      });
    }
    return results;
  };

  return (
    <div className="PlanetList">
      <div id="NavSection">
        <FeatPlanet />
      </div>

      <div className="Panel p-5">
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Search by name, climate, or terrain :
            <input
              className="form-control"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </form>
        <SortBy />
      </div>

      <div className="PlanetGrid">
        {sortResults(searchResults).map((planet) => (
          <div key={planet.url}>
            {editPlanet === planet ? (
              <div className="PlanetDiv p-2">
                <form className="form-inline" onSubmit={handleSave}>
                  <div className="form-group mt-2">
                    <label>
                      Name:
                      <input
                        className="form-control"
                        type="text"
                        defaultValue={planet.name}
                        name="name"
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Diameter:
                      <input
                        className="form-control"
                        type="number"
                        defaultValue={planet.diameter}
                        name="diameter"
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Climate:
                      <input
                        className="form-control"
                        type="text"
                        defaultValue={planet.climate}
                        name="climate"
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Terrain:
                      <input
                        className="form-control"
                        type="text"
                        defaultValue={planet.terrain}
                        name="terrain"
                      />
                    </label>
                  </div>

                  <div className="form-group mb-3">
                    <label>
                      Population:
                      <input
                        className="form-control"
                        type="number"
                        defaultValue={planet.population}
                        name="population"
                      />
                    </label>
                  </div>
                  <button type="submit">Save</button>
                  <button onClick={() => setEditPlanet(null)}>Cancel</button>
                </form>
              </div>
            ) : (
              <div className="PlanetDiv">
                <div className="DeleteDiv">
                  <button id="Delete" onClick={() => handleDelete(planet.url)}>
                    {" "}
                    X{" "}
                  </button>
                </div>
                <div className="PlanetDiv card p-4" key={planet.url}>
                  <h3>{planet.name}</h3>
                  <div className="textPlanet">
                    <p>
                      <b>Diameter:</b> {planet.diameter}
                    </p>
                    <p>
                      <b>Climate:</b> {planet.climate}
                    </p>
                    <p>
                      <b>Terrain:</b> {planet.terrain}
                    </p>
                    <p>
                      <b>Population:</b> {planet.population}
                    </p>
                  </div>
                  <div className="TwoButtons">
                    <button onClick={() => handleEdit(planet)}>EDIT</button>
                    <button>
                      <a
                        href="#NavSection"
                        onClick={() => showPlanet(planet.url)}
                      >
                        + INFO
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlanetList;
