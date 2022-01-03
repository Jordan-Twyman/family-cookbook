import React, { useContext, useEffect, useState } from "react"
import { RecipeContext } from "./RecipeProvider"
import "./Recipe.css"
import { useParams, useNavigate } from "react-router-dom"
import { IngredientContext } from "../ingredients/IngredientProvider"
import { RecipeIngredientContext } from "../recipeingredients/RecipeIngredientsProvider"



export const RecipeDetail = () => {
  const { getRecipeById, removeRecipe } = useContext(RecipeContext)
  const { getIngredients, ingredients } = useContext(IngredientContext)
  const { getRecipeIngredients, recipeIngredients, addRecipeIngredient } = useContext(RecipeIngredientContext)

	const [recipe, setRecipe] = useState({})
  const [recipeIngredient, setRecipeIngredient] = useState({

    ingredientId:0,
    amount:""    
});

	const {recipeId} = useParams();
	const navigate = useNavigate();

  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newIngredient = { ...recipeIngredient }
    //animal is an object with properties.
    //set the property to the new value
    newIngredient[event.target.id] = event.target.value
    //update state
    setRecipeIngredient(newIngredient)
  }


  const handleClickSaveIngredient = () => {
  
            //resetting both states
         
            addRecipeIngredient({
              ingredientId:+recipeIngredient.ingredientId,
              amount:recipeIngredient.amount,
              recipeId:+recipeId }
            )
            .then(() => {

              setRecipeIngredient({
                ingredientId:0,
                amount:""  
              })
            })
           }  //reloading the list with the new list, message edit state set back to 0, message needs to ga back to empty
  

  useEffect(() => {
    getIngredients()
    .then(getRecipeIngredients)
    // console.log("useEffect", recipeId)
    .then(() => {
    getRecipeById(recipeId)
    .then((response) => {
      setRecipe(response)
    })
  })}, [])


const handleRelease = () => {
    removeRecipe(recipe.id)
      .then(() => {
        navigate("/recipes")
      })
  }


  return ( 
    <>
    <section className="recipe">
      <h1 className="recipe__name">{recipe.recipeName}</h1>
      <h3 className="recipe__detailsLabel">Details</h3>
      <div className="recipe__details">{recipe.recipeDetails}</div>
      <h3 className="recipe__instructionsLabel">Instructions</h3>
      <div className="recipe__instructions">{recipe.recipeInstructions}</div>
      <h3 className="recipe__ingredientsnpm Label">Ingredients</h3>
      <div>
                <ul>
                    {
                      
                      recipeIngredients.filter(singleJointObj => singleJointObj.recipeId === recipe.id ).map(filteredJointObj => {
                        const ingredientObj = ingredients.find(i => i.id === filteredJointObj.ingredientId)
                        console.log(filteredJointObj)
                      return (
                        <li>{filteredJointObj?.amount} {ingredientObj?.ingredientName}</li>
                      )
                      })

                       
                    }
                </ul>
                <div>
      <button onClick={handleRelease}>Remove</button>
      <button onClick={() => {
    navigate(`/recipes/edit/${recipe.id}`)
}}>Edit</button>
</div>
            </div>
            <aside>
            <form className="recipeIngredientForm">
      <h2 className="recipeIngredientForm__title">Recipe Ingredient</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="ingredientAmount">amount:</label>
          <input type="text" id="amount" name="amount" onChange={handleControlledInputChange} value={recipeIngredient.amount} required autoFocus className="form-control" placeholder="Employee name" />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Ingredient Select: </label>
          <select value={recipeIngredient.ingredientId} name="ingredientId" id="ingredientId" className="form-control" onChange={handleControlledInputChange} >
            <option value="0">Select a location</option>
            {ingredients.map( l => (
              <option key={l.id} value={l.id}>
                {l.ingredientName}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button className="btn btn-primary"
        onClick={e => {
          e.preventDefault() 
          handleClickSaveIngredient()}}>
        Add Ingredient
      </button>
    </form>

            </aside>
 
            </section>
  

</>

      
  
)}