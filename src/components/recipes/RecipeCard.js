import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Recipe.css";
import { Link } from "react-router-dom";
import { MenuContext } from "../menu/MenuProvider";
import { RecipeContext } from "./RecipeProvider";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'






export const RecipeCard = ({ recipe, dinner }) =>  {

    const { getMenu } = useContext(MenuContext)
    const { getRecipeById, getRecipes, rating } = useContext(RecipeContext)
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const labels = {
        0.5: '',
        1: '',
        1.5: '',
        2: '',
        2.5: '',
        3: '',
        3.5: '',
        4: '',
        4.5: '',
        5: '',
      };
    const navigate = useNavigate()
    
     
    const {recipeId} = useParams();

    


    useEffect(() => {
        getRecipes().then(getMenu)
        // console.log("useEffect", recipeId
      }, [])

         const handleFavorites = (e) => {
     rating(recipe.id, value).then(getRecipes)
 }


    if (recipe.userId === +localStorage.activeUser) {

   

   
        
        


return (
    <section className="recipe">
        <h2 className="recipe__name" id="recipeId"  >
                {recipe.recipeName}
            
                        <MenuBookIcon size="large" className="details"  onClick={() => {navigate(`/recipes/detail/${recipe.id}`)}}/>
</h2> 
            <Rating
  name="hover-feedback"
  value={recipe.rating}
  precision={0.5}
  onClick={() => handleFavorites()}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
  onChangeActive={(event, newHover) => {
    setHover(newHover);
  }}
  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
/>
{value !== null && (
  <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
)}
   
    </section>
    
    )
}else {
    return ("")
}}