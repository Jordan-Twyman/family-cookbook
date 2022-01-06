import React, { useState, useContext, useEffect } from "react"
import { IngredientCard } from "./ingredients/IngredientCard"
import { useNavigate, useParams } from "react-router"
import { IngredientContext } from "./ingredients/IngredientProvider"
import { RecipeIngredientCard } from "./recipeingredients/RecipeIngredientsCard"
import { RecipeIngredientContext } from "./recipeingredients/RecipeIngredientsProvider"
import { RecipeContext } from "./recipes/RecipeProvider"




export const RecipeIngredientList = ({}) => {
    const { getIngredients, ingredients } = useContext(IngredientContext)
    const { getRecipeIngredients, recipeIngredients} = useContext(RecipeIngredientContext)
    const { getRecipeById} = useContext(RecipeContext)
    const { recipeId } = useParams()
    const [recipe, setRecipe] = useState({})
    const navigate = useNavigate()

  

    // Initialization effect hook -> Go get animal data
    useEffect(() => {
       getIngredients().then(getRecipeIngredients).then(() => {
           getRecipeById(recipeId)
           .then((response) => {
               setRecipe(response)
           })
       })
           }
       ,[]);
    return (
        <>

            <div className="recipeIngredients">
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
        </>
    )}