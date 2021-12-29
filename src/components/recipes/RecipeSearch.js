import React, { useContext } from "react"
import { RecipeContext } from "./RecipeProvider"
import "./Recipe.css"

export const RecipeSearch = () => {
  const { setSearchTerms } = useContext(RecipeContext)

  return (
    <>
      Recipe search:
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for an recipe... " />
    </>
  )
}