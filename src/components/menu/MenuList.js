import React, { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router"
import { RecipeContext } from "../recipes/RecipeProvider"
import { MenuCard } from "./MenuCard"
import { MenuContext } from "./MenuProvider"
import { Tooltip } from "react-bootstrap"






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



  return (
    <>
      <div className="menuContainer">
        <h2 className="menuHeader">Menu</h2>
        
        <div className="menuRecipes recipe">
                
                    {
                        menus.filter(singleJointObj => singleJointObj.madeIt === false ).map(filteredJointObj => {
                        const recipeObj = recipes.find(r => r.id === filteredJointObj.recipeId)
                        
                        const handleCheckbox = (e) => {
                        e.preventDefault();
                        madeIt(filteredJointObj?.id, true).then(getMenu)
}
                        console.log(filteredJointObj)
                        return (
                        <> <h3 data-toggle="tooltip" data-placement="top" title="Tooltip on top"> {recipeObj?.recipeName} <input type="checkbox" onClick={handleCheckbox} /></h3>
                        <em>{recipeObj?.recipeDetails}</em>
                        </>
                      )
                      })

                       
                    }
                
            </div>
      
      </div>
      </>)}