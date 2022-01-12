import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router"
import { RecipeContext } from "../recipes/RecipeProvider"
import { MenuCard } from "./MenuCard"
import { MenuContext } from "./MenuProvider"
import { Tooltip } from "react-bootstrap"
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Modal, Button } from "react-bootstrap";
import { Popover, OverlayTrigger } from "react-bootstrap"
import "./Menu.css";
import { RecipeDetail } from "../recipes/RecipeDetails"
import { IngredientContext } from "../ingredients/IngredientProvider"
import { RecipeIngredientContext } from "../recipeingredients/RecipeIngredientsProvider"
import StarIcon from '@mui/icons-material/Star';
import { RecipeCard } from "../recipes/RecipeCard"






export const MenuList = (menu) => {
  const { menus, getMenu, madeIt, addMenu } = useContext(MenuContext)
  const { ingredients, getIngredients} = useContext(IngredientContext)
  const { recipes, getRecipes, getRecipeById } = useContext(RecipeContext)
  const { recipeIngredients, getRecipeIngredients } = useContext(RecipeIngredientContext)

  //   const [filter, setFilter] = useState('Incomplete');

  const {recipeId} = useParams();
  const [recipe, setRecipe] = useState({})

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate()


  useEffect(() => {
    getRecipes()
    .then(getMenu).then(getIngredients).then(getRecipeIngredients)
    .then(() => {
      getRecipeById(recipeId)
      .then((response) => {
        setRecipe(response)
      })
  
    })
    // console.log("useEffect", recipeId)
  
    
  }, [])

  const handleClickSaveMenuItem = () => {
          
    //resetting both states
 
    addMenu({
      recipeId:+recipeId,
      madeIt:false,
      userId:+localStorage.activeUser
       }
    ).then(() => {
      navigate("/")
    })
    

      }


  

  // if (menu.userId === +localStorage.getItem('activeUser')) {


  return (
    <>
      <div className="menuContainer">
        
        <div className="menuRecipes recipe">
        <h1 className="menuHeader">Menu</h1>

                
                    { 
                        menus.filter(singleJointObj => 
                          singleJointObj.madeIt === false && singleJointObj.userId === +localStorage.activeUser ).map(filteredJointObj => {
                        const recipeObj = recipes.find(r => r.id === filteredJointObj.recipeId)
                        
                        const handleCheckbox = (e) => {
                        e.preventDefault();
                        madeIt(filteredJointObj?.id, true).then(getMenu)
}
                        console.log(filteredJointObj)
                        return (
                        <>      <h3 className="menuItemTitle"><input className="menuCheck" type="checkbox" onClick={handleCheckbox} /> {recipeObj?.recipeName} 
                        </h3>
                        <p className="menuItemTitle idk"><em>{recipeObj?.recipeDetails}</em></p><div className="menuItem"></div>
                        
                        </>
                      )
                      })

                       
                    }
                
           
            <Button className="menuAdd" variant="secondary" onClick={handleShow}>
    Favorites <StarIcon />
  </Button>

  <Modal size="lg" centered className="modal" show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title className="header"> <StarIcon /> 5 Star Recipes</Modal.Title>
    </Modal.Header>
    <Modal.Body className="favList">  
      
      
      {/* {recipes.filter(singleObj => singleObj.rating === 4 || singleObj.rating === 5).map
      (recipeObj => {
    
    return (
      // <div key={id}> {name}</div>
      <><div className="recipe menuFavs"> <h3> {recipeObj?.recipeName} </h3>
      <em>{recipeObj?.recipeDetails}</em></div>
     </>
    )})} */}


{
                    recipes.filter(recipeObj => recipeObj.rating === 5).map 
                    (recipe => {
                        return <RecipeCard key={recipe.id} recipe={recipe} />
                    })}
                
     </Modal.Body>
    <Modal.Footer className="footerModal">
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button> 
    </Modal.Footer>
  </Modal>
  </div>
      </div>
 
      </>
  )
                        
                  }
  