import React, { useContext } from "react"
import { RecipeContext } from "./RecipeProvider"
import SearchIcon from '@mui/icons-material/Search';
import "./Recipe.css"

export const RecipeSearch = () => {
  const { setSearchTerms } = useContext(RecipeContext)

  return (
    <>
    <big className="recipeSearch">
      <SearchIcon />
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for a recipe... " /></big>
    </>
  )
}