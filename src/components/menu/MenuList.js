import React, { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router"
import { RecipeContext } from "../recipes/RecipeProvider"
import { MenuCard } from "./MenuCard"
import { MenuContext } from "./MenuProvider"






export const MenuList = () => {
  const { menus, getMenu, madeIt } = useContext(MenuContext)
  const { recipes, getRecipes, getRecipeById } = useContext(RecipeContext)
  //   const [filter, setFilter] = useState('Incomplete');

  const {recipeId} = useParams();

  const navigate = useNavigate()


  useEffect(() => {
    getRecipes()
    .then(getMenu)
    // console.log("useEffect", recipeId)
  
    
  }, [])

//   const handleCheckbox = (e) => {
//     e.preventDefault();
//     madeIt(filteredJointObj?.id, true).then(getMenu)
// }

  return (
    <>
      <div className="ingredientsContainer">
        <h2>Menu</h2>
        <small>Check <input type="checkbox"/> to remove from menu</small><br></br>
        
        <div>
                
                    {
                      menus.filter(singleJointObj => singleJointObj.madeIt === false ).map(filteredJointObj => {
                        const recipeObj = recipes.find(r => r.id === filteredJointObj.recipeId)
                        
    const handleCheckbox = (e) => {
    e.preventDefault();
    madeIt(filteredJointObj?.id, true).then(getMenu)
}
                        console.log(filteredJointObj)
                      return (
                       <> <h3> {recipeObj?.recipeName} <input type="checkbox" onClick={handleCheckbox}/></h3>
                        <em>{recipeObj?.recipeDetails}</em>
                        </>
                      )
                      })

                       
                    }
                
            </div>
      
      </div>
      </>)}