import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Ingredient.css";
import { IngredientContext } from "./IngredientProvider";
import { Link } from "react-router-dom";


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
<p contentEditable="true" className="ingredientName">
    {ingredient.ingredientName}</p>
    <small><input className="completed" type ="checkbox"  onChange={handleCheckbox}/></small>
    
   
</section>

    )
}else {
    return ("")
}}

