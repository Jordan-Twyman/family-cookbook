import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { IngredientContext } from "../ingredients/IngredientProvider";
import { RecipeContext } from "../recipes/RecipeProvider";
import { RecipeIngredientContext } from "./RecipeIngredientsProvider";


export const RecipeIngredientsForm = () => {
  const { addEmployee, getEmployeeById, updateEmployee } = useContext(EmployeeContext);
  const { locations, getLocations } = useContext(LocationContext);
  const { employeeId } = useParams()
  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
  Define the intial state of the form inputs with useState()
  */

  const [employee, setEmployee] = useState({

    name: "",
    locationId: 0,
    manager:false,
    fullTime:false,
    hourlyRate:0    
});

  const navigate = useNavigate();

  /*
  Reach out to the world and get customers state
  and locations state on initialization.
  */
  useEffect(() => {
    getLocations().then(() => {
      if (employeeId) {
        getEmployeeById(employeeId).then(setEmployee)
      }
    });
  }, []);

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newEmployee = { ...employee };
    /* Animal is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newEmployee[event.target.name] = event.target.value;
    // update state
    setEmployee(newEmployee);
  }

  const handleControlledInputChangeBool = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newEmployee = { ...employee };
    /* Animal is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newEmployee[event.target.id] = event.target.checked;
    // update state
    setEmployee(newEmployee);
  }

  const handleClickSaveEmployee = (event) => {
    event.preventDefault(); //Prevents the browser from submitting the form

    const locationId = parseInt(employee.locationId);
    const hourlyRate = parseInt(employee.hourlyRate);
    const manager = Boolean(employee.manager)
    const fullTime = Boolean(employee.fullTime)

    employee.locationId = locationId
    employee.hourlyRate = hourlyRate
    employee.manager = manager
    employee.fullTime = fullTime
    

    if (locationId === 0 || hourlyRate === 0) {
      window.alert("Please enter complete employee information");
    } else if (employeeId) {
      updateEmployee(employee)
      .then(() => navigate(`/employees/detail/${employeeId}`))
    } else {
      //invoke addAnimal passing animal as an argument.
      //once complete, change the url and display the animal list
      addEmployee(employee)
      .then(() => navigate("/employees"));
    }
  }

  return (
    <form className="employeeForm">
      <h2 className="employeeForm__title">New Employee</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="employeeName">Employee name:</label>
          <input type="text" id="name" name="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee name" defaultValue={employee.name}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="employeeHours">Full Time:</label>
          <input type="checkbox" id="fullTime" name="fullTime" checked={employee.fullTime}  onChange={handleControlledInputChangeBool} value={employee.fullTime}
         unchecked/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="employeePosition">Manager:</label>
          <input type="checkbox" id="manager" name="manager" checked={employee.manager}  onChange={handleControlledInputChangeBool} defaultValue={employee.manager}
         unchecked/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="rate">Hourly Rate:</label>
          <input type="number" id="rate" name="hourlyRate" onChange={handleControlledInputChange} required className="form-control" placeholder="Hourly Rate" value={employee.hourlyRate}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to location: </label>
          <select value={employee.locationId} name="locationId" id="location" className="form-control" onChange={handleControlledInputChange} >
            <option value="0">Select a location</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button className="btn btn-primary"
        onClick={handleClickSaveEmployee}>
        Save Employee
      </button>
    </form>
  );
}