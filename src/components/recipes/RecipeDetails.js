import React, { useContext, useEffect, useState } from "react"
import { RecipeContext } from "./RecipeProvider"
import "./Recipe.css"
import { useParams, useNavigate } from "react-router-dom"
import { IngredientContext } from "../ingredients/IngredientProvider"
import { RecipeIngredientContext, RecipeIngredientsProvider } from "../RecipeIngredientsProvider"
import { IngredientList } from "../ingredients/IngredientList"



export const RecipeDetail = () => {
  const { getRecipeById, removeRecipe } = useContext(RecipeContext)
  const { getIngredients, ingredients } = useContext(IngredientContext)
  const { getRecipeIngredients, recipeIngredients } = useContext(RecipeIngredientContext)

	const [recipe, setRecipe, getRecipes] = useState({})

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

    // const history = useHistory()

const handleRelease = () => {
    removeRecipe(recipe.id)
      .then(() => {
        navigate("/recipes")
      })
  }



  return (
    <section className="recipe">
      <h1 className="recipe__name">{recipe.recipeName}</h1>
      <h3 className="recipe__detailsLabel">Details</h3>
      <div className="recipe__details">{recipe.recipeDetails}</div>
      <h3 className="recipe__instructionsLabel">Instructions</h3>
      <div className="recipe__instructions">{recipe.recipeInstructions}</div>
      <h3 className="recipe__ingredientsnpm Label">Ingredients</h3>
      <div>
                <ol>
                    {
                      recipeIngredients.filter(singleJointObj => singleJointObj.recipeId === recipe.id ).map(filteredJointObj => {
                        const ingredientObj = ingredients.find(i => i.id === filteredJointObj.ingredientId)
                        console.log(filteredJointObj)
                      return (
                        <li>{recipeIngredients?.amount}{ingredientObj?.ingredientName}</li>
                      )
                      })

                       
                    }
                </ol>
            </div>
      <button onClick={handleRelease}>Remove</button>
      <button onClick={() => {
    navigate(`/recipes/edit/${recipe.id}`)
}}>Edit</button>

    </section>
  )
}