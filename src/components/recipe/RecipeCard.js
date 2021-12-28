import React from "react";
import { useNavigate } from "react-router-dom";
import "./Recipe.css";

export const RecipeCard = ({ recipe }) =>  {
    const navigate = useNavigate()

return (
    <section className="recipeCard">
        <h2 className="event__name">Event name: {recipe.recipeName}</h2>
        <h3 className="recipe__detail">{recipe.recipeDetails}</h3>
        <p className="recipe__instruction">{recipe.recipeInstructions}</p>
        <button className="btn-secondary" onClick={() => {
            navigate(`/recipes/edit/${recipe.id}`)
                }}>Edit</button>
    </section>
    )
}