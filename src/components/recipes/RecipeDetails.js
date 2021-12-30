import React, { useContext, useEffect, useState } from "react"
import { RecipeContext } from "./RecipeProvider"
import "./Recipe.css"
import { useParams, useNavigate } from "react-router-dom"
import { IngredientContext } from "../ingredients/IngredientProvider"
import { RecipeIngredientContext } from "../recipeingredients/RecipeIngredientsProvider"



export const RecipeDetail = () => {
  const { getRecipeById, removeRecipe } = useContext(RecipeContext)
  const { getIngredients, ingredients, updateIngredient } = useContext(IngredientContext)
  const { getRecipeIngredients, recipeIngredients } = useContext(RecipeIngredientContext)
  const [idToEdit, setIdToEdit] = useState(0)

	const [recipe, setRecipe] = useState({})
  const [ingredient, setIngredient] = useState({})

	const {recipeId} = useParams();
	const navigate = useNavigate();

  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newIngredient = { ...ingredient }
    //animal is an object with properties.
    //set the property to the new value
    newIngredient[event.target.id] = event.target.value
    //update state
    setIngredient(newIngredient)
  }


  const handleSaveIngredient = () => {
      if (idToEdit){    //if theres id to edit in the state then do this
        //PUT - update , gets message ID from address
        updateIngredient({
            id: ingredient.id,
            userId: +localStorage.activeUser,
            ingredientName: ingredient.ingredientName
        })
        .then(()=> {
            //resetting both states
            setIdToEdit(0)
            setIngredient({})
            getIngredients() })  //reloading the list with the new list, message edit state set back to 0, message needs to ga back to empty
      }
    }
  

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
            </div>
            <aside>

            </aside>
            <div>
      <button onClick={handleRelease}>Remove</button>
      <button onClick={() => {
    navigate(`/recipes/edit/${recipe.id}`)
}}>Edit</button>
</div>
            </section>

</>

      
  
)}