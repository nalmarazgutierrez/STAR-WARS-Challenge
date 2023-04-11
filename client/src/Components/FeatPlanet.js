import React from "react";
// import './FeatProject.css';


function FeatPlanet(props) {
    let fp = props.featPlanet;
  
    if (!fp) {
      return <div>Click on a planet to show its information</div>;
    }
  
    return (
      <div className="FeatPlanet">
        <div>
          <h2>{fp.name}</h2>
          <p>Diameter: {fp.diameter} km</p>
          <p>Climate: {fp.climate}</p>
          <p>Terrain: {fp.terrain}</p>
          <p>Population: {fp.population}</p>
        </div>
      </div>
    );
  }
  


export default FeatPlanet;