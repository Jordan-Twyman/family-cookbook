import React, { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router"
import { IngredientContext } from "./IngredientProvider"
import { IngredientCard } from "./IngredientCard"
import "./Ingredient.css"
import { IngredientForm } from "./IngredientForm"
import { MenuContext } from "../menu/MenuProvider"
import { RecipeIngredientContext } from "../recipeingredients/RecipeIngredientsProvider"
import { RecipeContext } from "../recipes/RecipeProvider"
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';






export const IngredientList = () => {
  const { ingredients, getIngredients, getIngredientById } = useContext(IngredientContext)
  const { recipeIngredients, getRecipeIngredients } = useContext(RecipeIngredientContext)
  const { menus, getMenu } = useContext(MenuContext)
  const { recipes, getRecipes } = useContext(RecipeContext)

//   const [filter, setFilter] = useState('Incomplete');

  const navigate = useNavigate()

  useEffect(() => {
    getIngredients().then(getMenu).then(getRecipes).then(getRecipeIngredients)
        }
    ,[]);

 const getIngredientsForUsersMenu = () => {
  let myIngredients = []
  let joinTableEntries = menus.filter(singleJointObj => singleJointObj.madeIt === false && singleJointObj.userId === +localStorage.activeUser  )
  console.log("This should be entries from the join table for this user", joinTableEntries)

  // Find recipes that match join table entries
  let myRecipes = joinTableEntries.map( joinTableEntriesObj => { 
     const recipeObj = recipes.find(recipeObj => recipeObj.id === joinTableEntriesObj.recipeId)
    return recipeObj
     })
    // Find the recipe that matches the single join table entry

    // Return the recipe that we found
  
  console.log(myRecipes)

  // Find recipeIngrdient join table entries that match recipes
  let recipeIngreidnetJoinTableEntries = myRecipes.map(singleRecipe => {
    const myRecipeObj = recipeIngredients.filter(myRecipeObj => myRecipeObj.recipeId === singleRecipe.id )
    // find the matching recipeIngredients using .filter

    // You'll end up with an array of matching recipeIngredients
return [...myRecipeObj]
    // Return array with spread operator?
  }).flat()

  console.log("this should be an array of join table entries before we map",recipeIngreidnetJoinTableEntries)

  // Find ingredients that match recipeIngredient join table entries
  let ingredientsForTheWeek = recipeIngreidnetJoinTableEntries.map(filteredJointObj => {
    console.log("this is a single join table thing inside the map",filteredJointObj)
    // const array = (recipeIngreidnetJoinTableEntries.length)
    // console.log(array)
    const ingredientObj = ingredients.find(i => i.id === filteredJointObj.ingredientId)
    console.log("this should be an ingredient object that we find inside the map",ingredientObj)
    
    // Find the associated ingredient for this join table entry (there can only be one! use .find!)
return ingredientObj
    // Return the ingredient

  }) 
  console.log("this should be menu recipe's ingredients",ingredientsForTheWeek)

  return ingredientsForTheWeek
 }
 

 let nameOfIngredient = getIngredientsForUsersMenu().map(fi =>{
  return (
    fi.ingredientName
  )})

  let uniqueIngredients = [...new Set(nameOfIngredient)];
  console.log("this should be an array of ingredients iterated once",uniqueIngredients)


  //  menus.filter(singleJointObj => singleJointObj.madeIt === false && singleJointObj.userId === +localStorage.activeUser  ).map(anotherJointObj => anotherJointObj.recipeId === recipes.id).map(filteredJointObj => {
  //    const ingredientObj = ingredients.find(i => i.id === filteredJointObj.ingredientId)
  //    console.log(filteredJointObj)
  //    return (
  //     <li>{filteredJointObj?.amount} {ingredientObj?.ingredientName}</li>
  //    )
  //    })

  
  // console.log(occurrences)
  

 

  return (
  
      <div className="menuIngredientsContainer">
        
        <div className="menuIngredientList recipe">
        <h2 className="grocery">Shopping List</h2>
            {/* {console.log("TaskList: Render", tasks)} */}
            
            {/* {

                ingredients.map(ingredient => 
                   <IngredientCard key={ingredient.id} ingredient={ingredient} />)
            } */}

  
  {uniqueIngredients.map((name, index) => {
        
    const occurrences = nameOfIngredient.reduce((acc, curr) => {
      return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});
    console.log("this should be the number of times an ingredient will be used",occurrences)
    return (
      
      <li key={index}> {name} x {occurrences[name]}</li>
    )

})}
            
         

        </div>

  

      </div>
      

  )}

  // recipeIngredients.filter(singleJointObj => singleJointObj.recipeId === recipe.id ).map(filteredJointObj => {
  //   const ingredientObj = ingredients.find(i => i.id === filteredJointObj.ingredientId)
  //   console.log(filteredJointObj)
  // return (
  //   <li>{filteredJointObj?.amount} {ingredientObj?.ingredientName}</li>
  // )
  // })

   
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