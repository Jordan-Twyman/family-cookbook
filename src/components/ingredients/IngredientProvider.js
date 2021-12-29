import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const IngredientContext = createContext();

// This component establishes what data can be used.
export const IngredientProvider = (props) => {
    const [ingredients, setIngredient] = useState([]);
    // const [ searchTerms, setSearchTerms ] = useState("");

    const getIngredients = () => {
        return fetch("http://localhost:8088/ingredients")
        .then(res => res.json())
        .then(setIngredient)
    }

    const addIngredient = ingredientObj => {
        return fetch("http://localhost:8088/ingredients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ingredientObj)
        })
        .then(getIngredients)
    }
    const getIngredientById = (id) => {
        return fetch(`http://localhost:8088/ingredients/${id}`)
            .then(res => res.json())
    }

    const removeIngredient = ingredientId => {
        return fetch(`http://localhost:8088/ingredients/${ingredientId}`, {
            method: "DELETE"
        })
            .then(getIngredients)
      }

    const updateIngredient = ingredient => {
        return fetch(`http://localhost:8088/ingredients/${ingredient.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(ingredient)
        })
          .then(getIngredients)
      }

      const completed = (ingredientId, isComplete) => {
        return fetch(`http://localhost:8088/ingredients/${ingredientId}`, {
            method: "PATCH",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                completed: isComplete,
            }),
        }).then(getIngredients)
        //.then(response => response.json())
    } 

    return (
        <IngredientContext.Provider value={{
            ingredients, getIngredients, addIngredient, updateIngredient, getIngredientById, removeIngredient, completed
        }}>
            {props.children}
        </IngredientContext.Provider>
    )
}