import React, { useContext, useEffect, useState } from "react";
import { RecipeContext } from "./RecipeProvider"
import "./Recipe.css"
import { useNavigate, useParams } from 'react-router-dom';

export const RecipeForm = () => {
    const { addRecipe,getRecipeById,updateRecipe } = useContext(RecipeContext)
    
    const [recipe, setRecipe] = useState({
                userId:+localStorage.activeUser,
                id:"",
                recipeName:"",
                recipeDetails:"",
                recipeInstructions:""
    });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
  
    const {recipeId} = useParams();
    
    const handleControlledInputChange = (props) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newRecipe = { ...recipe }
        /* Animal is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newRecipe[props.target.id] = props.target.value
                // update state
        setRecipe(newRecipe)
      }
  
      const handleClickSaveEvent = () =>{
          if (recipe.recipeName==="" ||recipe.recipeDetails==="" ||recipe.recipeInstructions==="" ){window.alert("Please complete your recipe")
            }else{
                    setIsLoading(true);
                    if(recipeId){
                         updateRecipe({
                            userId:+localStorage.activeUser,
                            id:parseInt(recipe.id),
                            recipeName:recipe.recipeName,
                            recipeDetails:recipe.recipeDetails,
                            recipeInstructions:recipe.recipeInstructions
                            })
                         .then(()=> navigate(`/recipes/detail/${recipe.id}`))
                    }else{
                        addRecipe({
                            userId:+localStorage.activeUser,
                            recipeName:recipe.recipeName,
                            recipeDetails:recipe.recipeDetails,
                            recipeInstructions:recipe.recipeInstructions
                        })
                        .then(()=> navigate("/recipes/"))
                    }
      }
    }
        useEffect (() => {
            if(recipeId){
                getRecipeById(recipeId)
                .then(recipeObj => { setRecipe(recipeObj)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        }, [])
 return (
        <form className="eventForm">
             {recipeId ? <h2 className="eventForm__title">Edit Recipe</h2>: <h2 className="eventForm__title">New Recipe</h2>} 
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Recipe name:</label>
                    <input type="text" id="recipeName" onChange={handleControlledInputChange} required autoFocus className="form-control" defaultValue={recipe.recipeName}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="details">Description: </label>
                    <input type="text" id="recipeDetails" onChange={handleControlledInputChange}   className="form-control"  defaultValue={recipe.recipeDetails}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="instructions">Instructions: </label>
                    <input type="text" id="recipeInstructions" className="form-control" onChange={handleControlledInputChange} defaultValue={recipe.recipeInstructions}/>
                </div>
            </fieldset>
            <button id="saveEvent-button"className="btn btn-secondary" disabled={isLoading}
              onClick={e => {
                  e.preventDefault()
                  handleClickSaveEvent()}
                  }>
              {recipeId ? <>Update Recipe</> : <>Save Recipe</>}
            </button>
        </form>
      )
  }