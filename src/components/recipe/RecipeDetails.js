import React, { useContext, useEffect, useState } from "react"
import { RecipeContext } from "./RecipeProvider"
import "./Recipe.css"
import { useParams, useNavigate } from "react-router-dom"


export const RecipeDetail = () => {
  const { getRecipeById, releaseRecipe } = useContext(RecipeContext)

	const [recipe, setRecipe] = useState({})

	const {recipeId} = useParams();
	const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect", recipeId)
    getRecipeById(recipeId)
    .then((response) => {
      setRecipe(response)
    })
    }, [])

    // const history = useHistory()

const handleRelease = () => {
    releaseRecipe(recipe.id)
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

      {/* What's up with the question mark???? See below.*/}
      {/* <div className="animal__location">Location: {animal.location?.name}</div>
      <div className="animal__owner">Customer: {animal.customer?.name}</div> */}
      <button onClick={handleRelease}>Remove</button>
      <button onClick={() => {
    navigate(`/recipes/edit/${recipe.id}`)
}}>Edit</button>

    </section>
  )
}