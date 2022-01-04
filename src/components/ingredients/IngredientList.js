import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router"
import { IngredientContext } from "./IngredientProvider"
import { IngredientCard } from "./IngredientCard"
import "./Ingredient.css"
import { IngredientForm } from "./IngredientForm"






export const IngredientList = () => {
  const { ingredients, getIngredients } = useContext(IngredientContext)
//   const [filter, setFilter] = useState('Incomplete');

  const navigate = useNavigate()

  useEffect(() => {
    getIngredients()
  }, [])



  return (
    <>
      <div className="ingredientsContainer">
        <h2>Grocery List</h2>
        <small>Check <input type="checkbox"/> when completed</small><br></br>
        <big>Quick Add</big>
       <IngredientForm/>
        <div className="ingredients">
            {/* {console.log("TaskList: Render", tasks)} */}
            
            {

                ingredients.filter(ingredient => ingredient.completed === false).map(ingredient => 
                   <IngredientCard key={ingredient.id} ingredient={ingredient} />)
            }
        </div>
      </div>
      </>)}