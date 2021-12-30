import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router"
import { IngredientContext } from "./IngredientProvider"
import { IngredientCard } from "./IngredientCard"
import "./Ingredient.css"






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
        <button className="btn btn-secondary add-ingredient-button" onClick={() => navigate("/ingredients/create")}>
            Add Item
        </button>
        <div className="ingredients">
            {/* {console.log("TaskList: Render", tasks)} */}
            
            {

                ingredients.filter(ingredient => ingredient.completed === false).map(ingredient => 
                   <IngredientCard key={ingredient.id} ingredient={ingredient} />)
            }
        </div>
      </div>
      </>)}