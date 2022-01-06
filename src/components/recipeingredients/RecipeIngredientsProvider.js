import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const RecipeIngredientContext = createContext()

// This component establishes what data can be used.
export const RecipeIngredientsProvider = (props) => {
    const [recipeIngredients, setRecipeIngredient] = useState([])


    const getRecipeIngredients = () => {
        return fetch("http://localhost:8088/recipeIngredients")
        .then(res => res.json())
        .then(setRecipeIngredient)
    }

    const addRecipeIngredient = recipeIngredientObj => {
        return fetch("http://localhost:8088/recipeIngredients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipeIngredientObj)
        })
        .then(getRecipeIngredients)
    }

    const removeRecipeIngredient = recipeIngredientId => {
        return fetch(`http://localhost:8088/recipeIngredients/${recipeIngredientId}`, {
            method: "DELETE"
        })
            .then(getRecipeIngredients)
      }

    return (
        <RecipeIngredientContext.Provider value={{
            recipeIngredients, getRecipeIngredients, addRecipeIngredient, removeRecipeIngredient
        }}>
            {props.children}
        </RecipeIngredientContext.Provider>
    )

}