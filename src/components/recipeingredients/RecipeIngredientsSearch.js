import React, { useContext, useState, Component } from "react"
import { IngredientForm } from "../ingredients/IngredientForm"
import { IngredientContext } from "../ingredients/IngredientProvider"
import { RecipeIngredientCard } from "./RecipeIngredientsCard"
import { useEffect } from "react"
import { RecipeContext } from "../recipes/RecipeProvider"
import { RecipeIngredientContext } from "./RecipeIngredientsProvider"
import { useNavigate, useParams } from "react-router-dom"
import "./RecipeIngredients.css"



export const RecipeIngredientsSearch = () => {
  const { setSearchTerms, ingredients, searchTerms } = useContext(IngredientContext)
  const { getRecipeById } = useContext(RecipeContext)
  const { addRecipeIngredient, getRecipeIngredients } = useContext(RecipeIngredientContext)
  const [ filteredIngredients, setFiltered ] = useState([])
  const navigate = useNavigate();
  

  const {recipeId} = useParams();

  useEffect(() => {
    getRecipeIngredients()
    // console.log("useEffect", recipeId)
    .then(() => {
    getRecipeById(recipeId)
    .then((response) => {
      setRecipeIngredient(response)
    })
  })}, [])

  const [recipeIngredient, setRecipeIngredient] = useState({

    ingredientId:0,
    recipeId:0,
});
 
const [ chosenIngredient, setChosenIngredient ] = useState ("")

  



  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newIngredient = { ...recipeIngredient }
    //animal is an object with properties.
    //set the property to the new value
    newIngredient[event.target.id] = event.target.value
    //update state
    setRecipeIngredient(newIngredient)
  }


  const handleClickSaveIngredient = () => {
  
            //resetting both states
         
            addRecipeIngredient({
              ingredientId:+chosenIngredient.id,
              amount:recipeIngredient.amount,
              recipeId:+recipeId,
               }
            )
            .then(() => {

              setRecipeIngredient({
                ingredientId:0,
                amount:""  
              })
            })
           } 
           
           //reloading the list with the new list, message edit state set back to 0, message needs to ga back to empty


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
    <h2 className="recipeIngredientForm__title">Add Ingredients</h2>
      <div className="searchContainer"> Ingredient search:
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search " /><div className="ingredientList">
        

        
        {
            filteredIngredients.map(ingredient => {
                return <RecipeIngredientCard key={ingredient.id} ingredient={ingredient} setChosenIngredient={setChosenIngredient} />
            })
        }
        </div>
        </div>

          
            <form className="recipeIngredientForm form-group">
      
      <fieldset>
        <div>{chosenIngredient.ingredientName}
        
          </div>
      </fieldset>
            <fieldset>
        <div className="form-group">
          <label htmlFor="ingredientAmount">amount:</label>
          <input type="text" id="amount" name="amount" onChange={handleControlledInputChange} value={recipeIngredient.amount} required autoFocus className="form-control" />
        </div>
      </fieldset>
      <button className="btn btn-primary"
        onClick={e => {
          e.preventDefault() 
          handleClickSaveIngredient()}}>
        Add Ingredient </button>
      {/* </button> <button className="btn btn-secondary add-ingredient-button" onClick={() => navigate("/ingredients/create")}>
            Add New Ingredient
        </button> */}
    </form>
    <IngredientForm />
      </div>      
    </>
  )
}