import React from "react";
import "../recipes/Recipe.css";

export const MenuCard = ({ recipe, dinner }) =>  {

    if (recipe.userId === +localStorage.activeUser) {


return (
    <section className="recipe">
        <h2 className="recipe__name">
                {recipe.recipeName}
            </h2>
            <h3>{recipe.recipeDescription}</h3>
   
    </section>
    )
}else {
    return ("")
}}