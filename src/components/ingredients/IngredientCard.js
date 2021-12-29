import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Ingredient.css";
import { IngredientContext } from "./IngredientProvider";


export const IngredientCard = ({ ingredient }) => {

    const { getIngredients, completed } = useContext(IngredientContext)
    const navigate = useNavigate();

    const handleCheckbox = (e) => {
        e.preventDefault();
        completed(ingredient.id, true).then(getIngredients)
    }

    if (ingredient.userId === +localStorage.activeUser) {
       
     

    return (
<section className="ingredient">
<h3>
    {ingredient.ingredientName}
</h3>
<p><label htmlFor="completed">Completed?</label></p>
    <input className="completed" type ="checkbox"  onChange={handleCheckbox}/>
    
    <br/><button className="btn btn-secondary edit-button" onClick={() => {
    navigate(`/ingredients/edit/${ingredient.id}`)
}}>Edit</button>
</section>

    )
}else {
    return ("")
}}