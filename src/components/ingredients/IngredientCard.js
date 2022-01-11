import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Ingredient.css";
import { IngredientContext } from "./IngredientProvider";
import { Link } from "react-router-dom";


export const IngredientCard = ({ ingredient }) => {

    const { ingredients, getIngredientsById} = useContext(IngredientContext)
    const {ingredientId} = useParams();
    const [ingredientObj, setIngredientObj] = useState({})


    const navigate = useNavigate();

    useEffect(() => {
        getIngredientsById(ingredientId)
        .then((response) => {
          setIngredientObj(response)
        })
    
      })

 

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

