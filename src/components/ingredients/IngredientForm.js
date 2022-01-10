import React, { useContext, useEffect, useState } from "react";
import { IngredientContext } from "./IngredientProvider"
import "./Ingredient.css"
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";


export const IngredientForm = () => {
    const { addIngredient,getIngredientById,updateIngredient } = useContext(IngredientContext)
    const [ingredient, setIngredient] = useState({
                userId:+localStorage.activeUser,
                id:"",
                ingredientName:"",
               
    });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const {ingredientId} = useParams();
    
    const handleControlledInputChange = (props) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newIngredient = { ...ingredient }
        /* Animal is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newIngredient[props.target.id] = props.target.value
                // update state
        setIngredient(newIngredient)
      }
  
      const handleClickSaveEvent = () =>{
       
        // const recipeObj = recipes.find(r => r.id ===)
        // const ingredientObj = ingredients.find(i => i.id === filteredJointObj.ingredientId)
          if (ingredient.ingredientName === "" ){window.alert("No ingredient input")
            }else{
                    setIsLoading(true);
                    if(ingredientId){
                         updateIngredient({
                            userId:+localStorage.activeUser,
                            id:parseInt(ingredient.id),
                            ingredientName:ingredient.ingredientName,
                            
                            })
                        //  .then(()=> navigate(`/recipes/detail/${recipe.id}`))
                        //  .then(()=> navigate(`/recipes/detail/1`))
                    }else{
                        addIngredient({
                            userId:+localStorage.activeUser,
                            ingredientName:ingredient.ingredientName,
                         
                        })  
                   .then(handleClose)
                    }
      }
    }
        useEffect (() => {
            if(ingredientId){
                getIngredientById(ingredientId)
                .then(ingredientObj => { setIngredient(ingredientObj)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        }, [])
 return (

<>
    <Button style={{margin:"5px 50px"}} variant="primary" onClick={handleShow}>
    New Ingredient
  </Button>

  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add a new ingredient</Modal.Title>
    </Modal.Header>
    <Modal.Body> <form className="eventForm">
             {ingredientId ? <h2 className="eventForm__title">Edit Ingredient</h2>: <h2 className="eventForm__title"> </h2>} 
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Ingredient name:</label>
                    <input type="text" id="ingredientName" onChange={handleControlledInputChange} required autoFocus className="form-control" defaultValue={ingredient.ingredientName}/>
                </div>
            </fieldset>
            <button id="saveEvent-button"className="btn btn-secondary" disabled={isLoading}
              onClick={e => {
                  e.preventDefault()
                  handleClickSaveEvent()
                  }
                  }>
              {ingredientId ? <>Update Ingredient</> : <>Add</>}
            </button>
        </form>   </Modal.Body>
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


       
      )
  }