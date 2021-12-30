import React, { useContext } from "react"
import { IngredientContext } from "../ingredients/IngredientProvider"

export const RecipeIngredientsSearch = () => {
  const { setSearchTerms } = useContext(IngredientContext)

  return (
    <div className="recipe">
      Ingredient search:
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search ingredient to add... " />
        
    </div>
  )
}