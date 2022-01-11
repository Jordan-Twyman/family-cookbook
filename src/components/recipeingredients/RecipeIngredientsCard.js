
import { useNavigate } from 'react-router-dom';

export const RecipeIngredientCard = ({ ingredient, setChosenIngredient }) => {

   
       
   

    return (
        
        
<section className="recipeIngredient"><small onClick={() => setChosenIngredient(ingredient)}>

                {ingredient.ingredientName}
              
            </small>
</section>
)}

