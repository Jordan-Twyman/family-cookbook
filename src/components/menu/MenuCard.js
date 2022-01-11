import React from "react";
import { RecipeContext } from "../recipes/RecipeProvider";
import "../recipes/Recipe.css";
import { IngredientContext } from "../ingredients/IngredientProvider";

export const MenuCard = ({ menu }) =>  {

    // if (recipe.userId === +localStorage.activeUser) {


return (
    <section className="recipeForMenu">
        <h2 className="recipe__name">
                {menu.recipeName}Yo
            </h2>
            <h3>{menu.recipeDescription}</h3>
   
    </section>
    )
// }else {
//     return ("")
// }}
}