import React, { useContext, useState } from "react"
import { IngredientForm } from "../ingredients/IngredientForm"
import { IngredientContext } from "../ingredients/IngredientProvider"
import { RecipeIngredientCard } from "./RecipeIngredientsCard"
import { useEffect } from "react"


export const RecipeIngredientsSearch = () => {
  const { setSearchTerms, ingredients, searchTerms } = useContext(IngredientContext)
  const [ filteredIngredients, setFiltered ] = useState([])


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
    <div className="recipe">
      Ingredient search:
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search ingredient to add... " />
        
        
        {
            filteredIngredients.map(ingredient => {
                return <RecipeIngredientCard key={ingredient.id} ingredient={ingredient} />
            })
        }
        <IngredientForm />
    </div>
    </>
  )
}