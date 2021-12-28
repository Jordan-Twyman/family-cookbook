import React from "react";
import { useNavigate } from "react-router-dom";
import "./Recipe.css";
import { Link } from "react-router-dom";

export const RecipeCard = ({ recipe }) =>  {

return (
    <section className="recipe">
        <h2 className="recipe__name">
            <Link to={`/recipes/detail/${recipe.id}`}>
                {recipe.recipeName}
            </Link>
            </h2>
   
    </section>
    )
}