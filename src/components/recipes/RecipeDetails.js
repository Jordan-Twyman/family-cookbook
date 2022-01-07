import React, { useContext, useEffect, useState } from "react"
import { RecipeContext } from "./RecipeProvider"
import "./Recipe.css"
import { useParams, useNavigate } from "react-router-dom"
import { IngredientContext } from "../ingredients/IngredientProvider"
import { RecipeIngredientContext } from "../recipeingredients/RecipeIngredientsProvider"
import { MenuContext } from "../menu/MenuProvider"
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';





export const RecipeDetail = () => {
  const { getRecipeById, removeRecipe } = useContext(RecipeContext)
  const { getMenu, madeIt, addMenu } = useContext(MenuContext)
  const { getIngredients, ingredients } = useContext(IngredientContext)
  const { getRecipeIngredients, recipeIngredients, removeRecipeIngredient, getRecipeIngredientById } = useContext(RecipeIngredientContext)

	const [recipe, setRecipe] = useState({})
  const [recipeIngredient, setRecipeIngredient] = useState({})


	const {recipeId} = useParams();
  const {recipeIngredientId} = useParams();

	const navigate = useNavigate();

  useEffect(() => {
    getIngredients()
    .then(getRecipeIngredients)
    // console.log("useEffect", recipeId)
    .then(() => {
    getRecipeById(recipeId)
    .then((response) => {
      setRecipe(response)
      setRecipeIngredient(response)
    })

  })
}, [])


const handleRelease = () => {
    removeRecipe(recipe.id)
      .then(() => {
        navigate("/recipes")
      })
  }
  const handleIngredientRelease = (taco) => {
    removeRecipeIngredient(taco.id)
      
  }

  const handleClickSaveMenuItem = () => {
          
    //resetting both states
 
    addMenu({
      recipeId:+recipeId,
      madeIt:false,
      userId:+localStorage.activeUser
       }
    ).then(() => {
      navigate("/menu")
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
                        <><li>{filteredJointObj?.amount} {ingredientObj?.ingredientName} <IconButton aria-label="delete" size="small" >
                        <DeleteIcon fontSize="inherit" onClick={ () => handleIngredientRelease(filteredJointObj)} />
                      </IconButton></li>       
                  </>

                      )
                      })

                       
                    }
                </ul>
            </div>
            <Fab color="" size="small" aria-label="edit" style={{margin: "auto 10px auto auto"}} onClick={() => {
    navigate(`/recipes/edit/${recipe.id}`)
}}>
        <EditIcon />
      </Fab>
            <button className="madeIt btn btn-primary"  onClick={handleClickSaveMenuItem}>Make it!</button>
      <h3 className="recipe__ingredientsLabel">Instructions</h3>

 <div className="recipe__instructions">{recipe.recipeInstructions}</div>

      <IconButton aria-label="delete" size="small" onClick={handleRelease}>
                        <DeleteIcon />
                      </IconButton>



    </section>
  )
}