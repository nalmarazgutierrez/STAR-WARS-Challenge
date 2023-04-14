import React, { useState, useContext } from "react";
import StarWarsContext from "./StarWarsContext";

const EMPTY_PLANET = {
  name: "",
  diameter: "",
  climate: "",
  terrain: "",
  population: "",
};

function AddPlanetForm() {
  const { planets, setPlanets } = useContext(StarWarsContext);
  const [newPlanet, setNewPlanet] = useState(EMPTY_PLANET);

  function addPlanet(e) {
    e.preventDefault();
    setPlanets((prevState) => [...prevState, newPlanet]);
    setNewPlanet(EMPTY_PLANET);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewPlanet((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div>
      <form onSubmit={addPlanet}>
        <h2>Add a new planet</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newPlanet.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Diameter:
          <input
            type="number"
            name="diameter"
            value={newPlanet.diameter}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Climate:
          <input
            type="text"
            name="climate"
            value={newPlanet.climate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Terrain:
          <input
            type="text"
            name="terrain"
            value={newPlanet.terrain}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Population:
          <input
            type="text"
            name="population"
            value={newPlanet.population}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add planet</button>
      </form>
    </div>
  );
}

export default AddPlanetForm;
