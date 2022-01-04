import React, { useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { IngredientContext } from "../ingredients/IngredientProvider";
import { RecipeIngredientContext } from "../recipeingredients/RecipeIngredientsProvider";
import { RecipeContext } from "../recipes/RecipeProvider";


export const DinnerSelect = () => {
    const { recipes, getRecipes } = useContext(RecipeContext)
    const { ingredients } = useContext(IngredientContext)
    const {recipeIngredients, getRecipeIngredients} = useContext(RecipeIngredientContext)

    const [recipe, setRecipe] = useState({})

    const [dinner, setDinner] = useState({});
    
const navigate = useNavigate()

    const handleClickViewIngredients = () => {
        
            recipeIngredients.filter(singleJointObj => singleJointObj.recipeId === recipe.id ).map(filteredJointObj => {
                const ingredientObj = ingredients.find(i => i.id === filteredJointObj)
                return (<li>{ingredientObj?.ingredientName}</li>)
            })
        
    }

    useEffect(() => {
        getRecipes().then(getRecipeIngredients);
      }, []);

    return (
        <>
        <h2>What's for dinner?</h2>
         <select  name="ingredientId" id="ingredientIdncd " className="form-control" value={dinner.recipeId} >
            <option value="0">Select...</option>
            {recipes.map( l => (
              <option key={l.id} value={l.id} setDinner={setDinner}>
                {l.recipeName}
              </option>
            ))}
          </select> 
          <button className="btn btn-primary" onClick={handleClickViewIngredients}>
        View Ingredients
      </button>
          </>
    )
}