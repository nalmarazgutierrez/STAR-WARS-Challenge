import React from 'react';

function PlanetList(props) {

  return (
    <div className="PlanetList">
      {
        props.planets.map(p => (
         <div key={p.url}>
         <a onClick={() => props.showPlanet(p.url)}>{p.name}</a>
         </div>
        ))
      }
    </div>
  );
}

export default PlanetList;

