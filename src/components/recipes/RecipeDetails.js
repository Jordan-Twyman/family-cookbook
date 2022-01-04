import React, { useContext, useEffect, useState } from "react"
import { RecipeContext } from "./RecipeProvider"
import "./Recipe.css"
import { useParams, useNavigate } from "react-router-dom"
import { IngredientContext } from "../ingredients/IngredientProvider"
import { RecipeIngredientContext } from "../recipeingredients/RecipeIngredientsProvider"



export const RecipeDetail = () => {
  const { getRecipeById, removeRecipe } = useContext(RecipeContext)
  const { getIngredients, ingredients } = useContext(IngredientContext)
  const { getRecipeIngredients, recipeIngredients } = useContext(RecipeIngredientContext)

	const [recipe, setRecipe] = useState({})

	const {recipeId} = useParams();
	const navigate = useNavigate();

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
    <section className="recipe">
      <h1 className="recipe__name">{recipe.recipeName}</h1>
      <h3 className="recipe__detailsLabel">Description</h3>
      <div className="recipe__details">{recipe.recipeDetails}</div>
      <h3 className="recipe__ingredientsLabel">Ingredients</h3>

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
            </div>
      
      <h3 className="recipe__ingredientsLabel">Instructions</h3>

 <div className="recipe__instructions">{recipe.recipeInstructions}</div>
 <button onClick={() => {
    navigate(`/recipes/edit/${recipe.id}`)
}}>Add Instructions</button>
      <button onClick={handleRelease}>Remove Recipe</button>


    </section>
  )
}