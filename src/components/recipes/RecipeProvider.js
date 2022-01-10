import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const RecipeContext = createContext()

// This component establishes what data can be used.
export const RecipeProvider = (props) => {
    const [recipes, setRecipe] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("");

    const getRecipes = () => {
        return fetch("http://localhost:8088/recipes")
        .then(res => res.json())
        .then(setRecipe)
    }

    const addRecipe = eventObj => {
        return fetch("http://localhost:8088/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventObj)
        })
        .then(getRecipes)
    }
    const getRecipeById = (id) => {
        return fetch(`http://localhost:8088/recipes/${id}`)
            .then(res => res.json())
    }

    const removeRecipe = recipeId => {
        return fetch(`http://localhost:8088/recipes/${recipeId}`, {
            method: "DELETE"
        })
            .then(getRecipes)
      }

    const updateRecipe = eventObj => {
        return fetch(`http://localhost:8088/recipes/${eventObj.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(eventObj)
        })
          .then(getRecipes)
      }

           const rating = (recipeId, rating) => {
         return fetch(`http://localhost:8088/recipes/${recipeId}`, {
             method: "PATCH",
             headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
            rating: rating,
             }),
         }).then(getRecipes)
        //.then(response => response.json())
     } 

    return (
        <RecipeContext.Provider value={{
            recipes, getRecipes, addRecipe, updateRecipe,getRecipeById, searchTerms, setSearchTerms, removeRecipe, rating
        }}>
            {props.children}
        </RecipeContext.Provider>
    )
}