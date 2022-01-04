import React, { useState, useContext, useEffect } from "react"
import { IngredientCard } from "../ingredients/IngredientCard"
import { useNavigate } from "react-router"
import { IngredientContext } from "../ingredients/IngredientProvider"
import { RecipeIngredientCard } from "./RecipeIngredientsCard"




export const RecipeIngredientList = ({}) => {
    const { getIngredients, ingredients, searchTerms } = useContext(IngredientContext)
    const [ filteredIngredients, setFiltered ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getIngredients()
        
    }, [])

    // Initialization effect hook -> Go get animal data
    useEffect(() => {
        if (searchTerms !== "") {
          // If the search field is not blank, display matching animals
          const subset = ingredients.filter(ri => ri.ingredientName.toLowerCase().includes(searchTerms))
          setFiltered(subset)
        } else {
          // If the search field is blank, display all recipes
          setFiltered(ingredients)
        }
      }, [searchTerms, ingredients])

    return (
        <>

            <div className="recipeIngredients">
                {
                    filteredIngredients.map(ingredient => {
                        return <RecipeIngredientCard key={ingredient.id} ingredient={ingredient} />
                    })
                }
            </div>
        </>
    )
}


// {
                      
//     recipeIngredients.filter(singleJointObj => singleJointObj.recipeId === recipe.id ).map(filteredJointObj => {
//       const ingredientObj = ingredients.find(i => i.id === filteredJointObj.ingredientId)
//       console.log(filteredJointObj)
//     return (
//       <li>{filteredJointObj?.amount} {ingredientObj?.ingredientName}</li>
//     )
//     })

     
//   }