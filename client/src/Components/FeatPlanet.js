import React from "react";
// import './FeatProject.css';


function FeatPlanet(props) {

  let fp = props.featProj2;

  return (
    <div className="FeatPlanet">
      <img src={fp.image} alt={fp.title} />

      <div>
        <h2>{fp.title}</h2>
        <p>{fp.description}</p>
      </div>
    </div>
  );
}


export default FeatPlanet;