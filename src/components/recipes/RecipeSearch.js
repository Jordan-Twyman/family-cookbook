import React, { useContext } from "react"
import { RecipeContext } from "./RecipeProvider"
import SearchIcon from '@mui/icons-material/Search';
import { Example } from "./RecipeModalForm"
import "./Recipe.css"

export const RecipeSearch = () => {
  const { setSearchTerms } = useContext(RecipeContext)

  return (
    <>
                <h2 className="recipeHeader">My Recipes <Example/></h2>

    <big className="recipeSearch">
      <SearchIcon />
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for a recipe... " /></big>
    </>
  )
}