import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Ingredient.css";
import { IngredientContext } from "./IngredientProvider";
import { Link } from "react-router-dom";


export const IngredientCard = ({ ingredient }) => {

    const navigate = useNavigate();

 

    if (ingredient.userId === +localStorage.activeUser) {
       
     

    return (
<section className="ingredient">
<p className="ingredientName" >
    {ingredient.ingredientName}</p>
    
   
</section>

    )
}else {
    return ("")
}}

