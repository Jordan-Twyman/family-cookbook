import React, { useState, useContext, useEffect } from "react"
import { RecipeContext } from "./RecipeProvider"
import { RecipeCard } from "./RecipeCard"
import "./Recipe.css"
import { useNavigate } from "react-router"
import { Example } from "./RecipeModalForm"




export const RecipeList = ({}) => {
    const { getRecipes, recipes, searchTerms } = useContext(RecipeContext)
    const [ filteredRecipes, setFiltered ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getRecipes()
    }, [])

    // Initialization effect hook -> Go get animal data
    useEffect(() => {
        if (searchTerms !== "") {
          // If the search field is not blank, display matching animals
          const subset = recipes.filter(recipe => recipe.recipeName.toLowerCase().includes(searchTerms))
          setFiltered(subset)
        } else {
          // If the search field is blank, display all recipes
          setFiltered(recipes)
        }
      }, [searchTerms, recipes])

    return (
        <>
            <h2>Recipes</h2>

            
            <Example/>
            <div className="recipes">
                {
                    filteredRecipes.map(recipe => {
                        return <RecipeCard key={recipe.id} recipe={recipe} />
                    })
                }
            </div>
        </>
    )
}