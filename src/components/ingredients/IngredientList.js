import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router"
import { IngredientContext } from "./IngredientProvider"
import { IngredientCard } from "./IngredientCard"
import "./Ingredient.css"
import { IngredientForm } from "./IngredientForm"
import { MenuContext } from "../menu/MenuProvider"
import { RecipeIngredientContext } from "../recipeingredients/RecipeIngredientsProvider"






export const IngredientList = () => {
  const { ingredients, getIngredients } = useContext(IngredientContext)
  const { recipeIngredients, getRecipeIngredients } = useContext(RecipeIngredientContext)
  const { menus, getMenu } = useContext(MenuContext)
  const { recipes, getRecipe } = useContext(MenuContext)

//   const [filter, setFilter] = useState('Incomplete');

  const navigate = useNavigate()

  useEffect(() => {
    getIngredients().then(getMenu)
        }
    ,[]);

 const getIngredientsForUsersMenu = () => {
  let ingredients = []
  let joinTableEntries = menus.filter(singleJointObj => singleJointObj.madeIt === false && singleJointObj.userId === +localStorage.activeUser  )
  console.log("This should be entries from the join table for this user", joinTableEntries)

  // Find recipes that match join table entries
  let recipes = joinTableEntries.map(singleJoinTableEntry => {
    // Find the recipe that matches the single join table entry

    // Return the recipe that we found
  })
  console.log(recipes)

  // Find recipeIngrdient join table entries that match recipes
  let recipeIngreidnetJoinTableEntries = recipes.map(singleRecipe => {
    // find the matching recipeIngredients using .filter

    // You'll end up with an array of matching recipeIngredients

    // Return array with spread operator?
  })

  // Find ingredients that match recipeIngredient join table entries
  let ingredientsForTheWeek = recipeIngreidnetJoinTableEntries.map(singleJoinTableObject => {
    // Find the associated ingredient for this join table entry (there can only be one! use .find!)

    // Return the ingredient

  }) 

  return ingredientsForTheWeek
 }


  // .map(anotherJointObj => anotherJointObj.recipeId === recipes.id).map(filteredJointObj => {
  //   const ingredientObj = ingredients.find(i => i.id === filteredJointObj.ingredientId)
  //     console.log(filteredJointObj)
  //   return (
  //     <li>{filteredJointObj?.amount} {ingredientObj?.ingredientName}</li>
  //   )
  //   })



 

  return (
    <>
      <div className="ingredientsContainer">
        <h2>Menu Grocery List</h2>
        <div className="ingredients">
            {/* {console.log("TaskList: Render", tasks)} */}
            
            {/* {

                ingredients.map(ingredient => 
                   <IngredientCard key={ingredient.id} ingredient={ingredient} />)
            } */}
  
            
            {getIngredientsForUsersMenu()}
        </div>
      </div>
      </>)
      }



//   recipeIngredients.filter(singleJointObj => singleJointObj.recipeId === recipe.id ).map(filteredJointObj => {
//     const ingredientObj = ingredients.find(i => i.id === filteredJointObj.ingredientId)
//     console.log(filteredJointObj)
//   return (
//     <li>{filteredJointObj?.amount} {ingredientObj?.ingredientName}</li>
//   )
//   })

   
// }

// {
//   menus.filter(singleJointObj => singleJointObj.madeIt === false ).map(filteredJointObj => {
//     const recipeObj = recipes.find(r => r.id === filteredJointObj.recipeId)
    
// const handleCheckbox = (e) => {
// e.preventDefault();
// madeIt(filteredJointObj?.id, true).then(getMenu)
// }
//     console.log(filteredJointObj)
//   return (
//    <> <h3> {recipeObj?.recipeName} <input type="checkbox" onClick={handleCheckbox}/></h3>
//     <em>{recipeObj?.recipeDetails}</em>
//     </>
//   )
//   })

   
// }