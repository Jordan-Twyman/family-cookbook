import { Button, Modal } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { RecipeContext } from "./RecipeProvider";
import { useNavigate } from "react-router-dom";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { teal } from '@mui/material/colors';

const color = teal[500];





export const Example = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const { addRecipe} = useContext(RecipeContext)
    
    const [recipe, setRecipe] = useState({
                userId:+localStorage.activeUser,
                id:"",
                recipeName:"",
                recipeDetails:"",
                recipeInstructions:""
    });
    const navigate = useNavigate();
  
    
    const handleControlledInputChange = (props) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newRecipe = { ...recipe }
        /* Animal is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newRecipe[props.target.id] = props.target.value
                // update state
        setRecipe(newRecipe)
      }
  
      const handleClickSaveEvent = () =>{
          if (recipe.recipeName===""){window.alert("Please complete your recipe title")
            }else{
                        addRecipe({
                            userId:+localStorage.activeUser,
                            recipeName:recipe.recipeName,
                            recipeDetails:recipe.recipeDetails,
                            recipeInstructions:"Click the pencil to add instructions and/or update recipe name and description!"
                        })

                        .then(handleClose)

                        .then(r => r.json())

                        .then( r => navigate(`/recipes/detail/${r.id}`))
                    }
      }
    
       
    return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          New Recipe
        </Button> */}
        <Fab  color="" style={{margin:"auto 10px", color:"black"}} aria-label="add" className="addRecipe" onClick={e => {
          e.preventDefault() 
          handleShow()}}>
  <AddIcon />
</Fab>
  
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>New Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>   <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Recipe name:</label>
                    <input type="text" id="recipeName" onChange={handleControlledInputChange} required autoFocus className="form-control" defaultValue={recipe.recipeName}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="details">Description: </label>
                    <input type="text" id="recipeDetails" onChange={handleControlledInputChange}   className="form-control"  defaultValue={recipe.recipeDetails}/>
                </div>
            </fieldset></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClickSaveEvent}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }