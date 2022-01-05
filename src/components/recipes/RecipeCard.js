import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Recipe.css";
import { Link } from "react-router-dom";
import { MenuContext } from "../menu/MenuProvider";
import { RecipeContext } from "./RecipeProvider";



export const RecipeCard = ({ recipe, dinner }) =>  {

    const { getMenu, madeIt, addMenu } = useContext(MenuContext)
    const { getRecipeById, getRecipes } = useContext(RecipeContext)

    const navigate = useNavigate()
    
     
    const [ chosenDinner, setChosenDinner ] = useState ("")
    const {recipeId} = useParams();


    useEffect(() => {
        getRecipes().then(getMenu)
        // console.log("useEffect", recipeId)
        .then(() => {
        getRecipeById(recipeId)
        })
      }, [])


    if (recipe.userId === +localStorage.activeUser) {

   

   
        
        


return (
    <section className="recipe">
        <h2 className="recipe__name" id="recipeId"  >
                {recipe.recipeName}
            
            </h2>
           
            <button className="details"  onClick={() => {navigate(`/recipes/detail/${recipe.id}`)}}>View Details</button>
   
    </section>
    )
}else {
    return ("")
}}