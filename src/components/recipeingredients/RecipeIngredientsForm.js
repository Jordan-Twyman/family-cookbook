import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { IngredientContext } from "../ingredients/IngredientProvider";
import { RecipeContext } from "../recipes/RecipeProvider";
import { RecipeIngredientContext } from "./RecipeIngredientsProvider";


export const RecipeIngredientsForm = () => {
  const { addRecipeIngredient, getRecipeIngredientById } = useContext(RecipeIngredientContext);
  const { ingredients, getIngredients } = useContext(LocationContext);
  const { recipeIngredientsId } = useParams()
  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
  Define the intial state of the form inputs with useState()
  */

  const [recipeIngredient, setRecipeIngredient] = useState({

    recipeId: 0,
    ingredientId:false,
    amount:""    
});

  const navigate = useNavigate();

  /*
  Reach out to the world and get customers state
  and locations state on initialization.
  */
  useEffect(() => {
    getIngredients().then(() => {
      if (recipeIngredientsId) {
        getRecipeIngredientById(recipeIngredientsId).then(setRecipeIngredient)
      }
    });
  }, []);

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newRecipeIngredient = { ...recipeIngredient };
    /* Animal is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newRecipeIngredient[event.target.name] = event.target.value;
    // update state
    setRecipeIngredient(newRecipeIngredient);
  }



  const handleClickSaveIngredient = (event) => {
    event.preventDefault(); //Prevents the browser from submitting the form

    const recipeId = parseInt(recipeIngredient.recipeId);
    const ingredientId = parseInt(recipeIngredient.ingredientId);
    

    recipeIngredient.recipeId = recipeId
    recipeIngredient.ingredientId = ingredientId
    
    

    if (recipeId === 0 || ingredientId === 0) {
      window.alert("Please enter complete employee information");
    
    //   .then(() => navigate(`/employees/detail/${employeeId}`))
    } else {
     
      addRecipeIngredient(recipeIngredient)
    //   .then(() => navigate("/employees"));
    }
  }

  return (
    <form className="employeeForm">
      <h2 className="employeeForm__title">New Employee</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="employeeName">Employee name:</label>
          <input type="text" id="name" name="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee name" defaultValue={recipeIngredient.name}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to location: </label>
          <select value={recipeIngredient.ingredientId} name="ingredientId" id="ingredient" className="form-control" onChange={handleControlledInputChange} >
            <option value="0">Select a location</option>
            {ingredients.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button className="btn btn-primary"
        onClick={handleClickSaveIngredient}>
        Add Ingredient
      </button>
    </form>
  );
}