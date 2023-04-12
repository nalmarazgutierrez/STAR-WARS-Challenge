import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RecipesContext from "./RecipesContext";
import Local from "../helpers/Local";

// const EMPTY_PLANET = {
//   plan_title: ''
// };

function AddPlanet() {

  //const [newPlan, setNewPlan] = useState(EMPTY_PLAN);
  const navigate = useNavigate();

 const {newPlanet, setNewPlanet} = useContext(RecipesContext);
  
 async function handleSubmit(event) {
    event.preventDefault();
    await props.addPlanUser(newPlan);
    setNewPlanet(EMPTY_PLAN);
  }
  

  function handleChange(event) {
    let { name, value } = event.target;
        setNewPlanet(data => ({
            ...data, 
            [name]: value
        }));
    }

  
return (
  <div>
    
    <form onSubmit={handleSubmit}>
                
         <div>
            <div>
                {/* <h5 style={{ color: 'white', fontWeight: 'initial'}} className="mb-2">Start by giving a title to your plan</h5> */}
                <label></label>
                <input required type="text" id="ans" name="name" placeholder="My planet name..."
                value={newPlanet.name}
                onChange={handleChange}
            />  
          </div>
          </div>
          {/* <div class="row justify-content-between text-left">
            <div class="form-group col-12 flex-column d-flex">
                <label className="form-control-label px-1"></label>
                <input type="date" id="ans" name="creationDate" placeholder="Toda's Date"
                value={newProgram.creationDate}
                onChange={handleChange}
            />  
          </div>
          </div> */}

        <div>
           {editingPlan ?
            <div> 
            <button id="buttonA" className="btn btn-warning px-5 btn-lg" type="submit">SAVE</button> 
            </div> :
            <div> 
            <button id="buttonA" className="btn btn-warning px-5 btn-lg" type="submit">START</button> 
            </div>
            }
        </div>
    </form>
    </div>
);

} 

  export default AddPlanet;