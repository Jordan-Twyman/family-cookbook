import { Route, Routes } from "react-router-dom";
import React from "react";
import { RecipeProvider } from "./recipes/RecipeProvider";
import { RecipeSearch } from "./recipes/RecipeSearch";
import { RecipeList } from "./recipes/RecipeList";
import { RecipeDetail } from "./recipes/RecipeDetails";
import { RecipeForm } from "./recipes/RecipeForm";
import { IngredientList } from "./ingredients/IngredientList";
import { IngredientProvider } from "./ingredients/IngredientProvider";
import { IngredientForm } from "./ingredients/IngredientForm";
import { RecipeIngredientsProvider } from "./recipeingredients/RecipeIngredientsProvider";
import { RecipeIngredientsSearch } from "./recipeingredients/RecipeIngredientsSearch";
import { MenuList } from "./menu/MenuList";
import {  MenuProvider } from "./menu/MenuProvider";






export const ApplicationViews = () => {

    return (
        <MenuProvider>
        <RecipeIngredientsProvider>
        <IngredientProvider>
        <RecipeProvider>
        <Routes>
            {/* <Route path="/*" element={<><DinnerCard />  </>} /> */}
            <Route path ="/recipes/*" element={<><RecipeSearch /><RecipeList /></>}/>
            <Route path ="/recipes/create" element={<RecipeForm />}/>
            <Route path="/recipes/detail/:recipeId/*" element={<div className="detailsBox"> <RecipeDetail /><aside> <RecipeIngredientsSearch /></aside></div>} />
            <Route path="recipes/edit/:recipeId/*" element={<RecipeForm />} />
            <Route path ="/ingredients/*" element={<IngredientList />}/>
            {/* <Route path ="/ingredients/create" element={<IngredientForm />}/>
            <Route path="ingredients/edit/:ingredientId/*" element={<IngredientForm />} /> */}
            <Route path ="/menu/*" element={<MenuList />}/>
        </Routes>
        </RecipeProvider>
        </IngredientProvider>
        </RecipeIngredientsProvider>
        </MenuProvider>
    )
}