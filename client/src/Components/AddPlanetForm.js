import React, { useState, useContext } from "react";
import StarWarsContext from "./StarWarsContext";
import "./AddPlanetForm.scss";

const EMPTY_PLANET = {
  name: "",
  diameter: "",
  climate: "",
  terrain: "",
  population: "",
};

function AddPlanetForm() {
  const { planets, setPlanets, setFormSubmitted, setShowForm} = useContext(StarWarsContext);
  const [newPlanet, setNewPlanet] = useState(EMPTY_PLANET);

  function addPlanet(e) {
    e.preventDefault();
    setPlanets((prevState) => [...prevState, newPlanet]);
    setFormSubmitted(true);
    setNewPlanet(EMPTY_PLANET);
    setShowForm(false);
    setFormSubmitted(false);
    
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewPlanet((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className="AddPlanetForm card">
      <form onSubmit={addPlanet}>
      <h3>Add a New Planet</h3>
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
            type="number"
            name="population"
            value={newPlanet.population}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">ADD PLANET</button>
      </form>
    </div>
  );
}

export default AddPlanetForm;
