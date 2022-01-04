import React, { useState, useContext, useEffect } from "react"
import { IngredientCard } from "../ingredients/IngredientCard"
import { useNavigate, useParams } from "react-router"
import { IngredientContext } from "../ingredients/IngredientProvider"
import { RecipeIngredientCard } from "./RecipeIngredientsCard"
import { RecipeIngredientContext } from "./RecipeIngredientsProvider"




export const RecipeIngredientList = ({}) => {
    const { getIngredients, ingredients, searchTerms } = useContext(IngredientContext)
    const { getRecipeIngredients, getRecipeIngredientById, recipeIngredients} = useContext(RecipeIngredientContext)
    const { recipeIngredientsId } = useParams()
    const [recipe] = useState({})
    const [ recipeIngredient, setRecipeIngredient ] = useState({})
    const navigate = useNavigate()

  

    // Initialization effect hook -> Go get animal data
    useEffect(() => {
       getIngredients().then(() => {
           if(recipeIngredientsId) {
               getRecipeIngredientById(recipeIngredientsId).then(setRecipeIngredient)
           }
       },[])});
debugger
    return (
        <>

            <div className="recipeIngredients">
                {
                    recipeIngredients.filter(singleJointObj => singleJointObj.recipeId === recipe.id ).map(filteredJointObj => {
                        const ingredientObj = ingredients.find(i => i.id === filteredJointObj)
                        return (<li>{ingredientObj?.ingredientName}</li>)
                    })
                }
            </div>
        </>
    )}