import  { useContext, useState, Component } from "react"
import { IngredientForm } from "../ingredients/IngredientForm"
import { IngredientContext } from "../ingredients/IngredientProvider"
import { RecipeIngredientCard } from "./RecipeIngredientsCard"
import { useEffect } from "react"
import { RecipeContext } from "../recipes/RecipeProvider"
import { RecipeIngredientContext } from "./RecipeIngredientsProvider"
import { useNavigate, useParams } from "react-router-dom"
import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import "./RecipeIngredients.css"
import SearchIcon from '@mui/icons-material/Search';
import { Button, Modal } from "react-bootstrap";





export const RecipeIngredientsSearch = () => {
  const { setSearchTerms, ingredients, searchTerms } = useContext(IngredientContext)
  const { getRecipeById } = useContext(RecipeContext)
  const { addRecipeIngredient, getRecipeIngredients } = useContext(RecipeIngredientContext)
  const [ filteredIngredients, setFiltered ] = useState([])
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    amount:""
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

    if (chosenIngredient.ingredientName === undefined){window.alert("Please select ingredient from search")
  }else{
  
  
            //resetting both states
         
            addRecipeIngredient({
              ingredientId:+chosenIngredient.id,
              amount:recipeIngredient.amount,
              recipeId:+recipeId,
               }
            )
         
            .then(window.location.reload())

           } }
           
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
    
    <div className="ingredientSearch recipe">
    <h2 className="recipeIngredientForm__title">Ingredients List</h2>
      <div className="searchContainer"> 
      
      <SearchIcon className="searchy" /><input  
      type="text"
        className="input--wide ingredientSearchInput"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder= "search..." />
        <div className="ingredientList"> 
        

     
        {
            filteredIngredients.map(ingredient => {
                return <RecipeIngredientCard key={ingredient.id} ingredient={ingredient} setChosenIngredient={setChosenIngredient} />
            })
        }
        </div>
        </div>

          
            
     
<form className="recipeIngredientForm form-group">
  <div className="chosenIngredientContainer">
    <div>
<em className="chosenIngredient">{ chosenIngredient.ingredientName}</em>    <Fab color="" size="small" aria-label="add" onClick={e => {
          e.preventDefault() 
          handleClickSaveIngredient()}}>
  <AddIcon />
</Fab></div>

            <fieldset>
        <div className="form-group">
          <label htmlFor="ingredientAmount">amount:</label>
          <input type="text" id="amount" name="amount" onChange={handleControlledInputChange} value={recipeIngredient.amount} required autoFocus className="form-control" /> 
      
        </div>
      </fieldset>
      </div>    
 

<>
<p className="searchBottom">Don't see what you need? Add a new ingredient below!</p>
      <div className="ingredientFormContainer">  <IngredientForm /></div>
      </>
    </form>
   
      </div>      
    </>
  )
}