import { Route, Routes } from "react-router-dom";
import React from "react";
import { RecipeProvider } from "./recipes/RecipeProvider";
import { RecipeSearch } from "./recipes/RecipeSearch";
import { RecipeList } from "./recipes/RecipeList";
import { RecipeDetail } from "./recipes/RecipeDetails";
import { Home } from "./Home";
import { RecipeForm } from "./recipes/RecipeForm";
import { IngredientList } from "./ingredients/IngredientList";
import { IngredientProvider } from "./ingredients/IngredientProvider";
import { IngredientForm } from "./ingredients/IngredientForm";






export const ApplicationViews = () => {

    return (
        <IngredientProvider>
        <RecipeProvider>
        <Routes>
            <Route path="/*" element={<Home />} />
            <Route path ="/recipes/*" element={<><RecipeSearch /><RecipeList /></>}/>
            <Route path ="/recipes/create" element={<RecipeForm />}/>
            <Route path="/recipes/detail/:recipeId/*" element={<RecipeDetail />} />
            <Route path="recipes/edit/:recipeId/*" element={<RecipeForm />} />
            <Route path ="/ingredients/*" element={<IngredientList />}/>
            <Route path ="/ingredients/create" element={<IngredientForm />}/>
            <Route path="ingredients/edit/:ingredientId/*" element={<IngredientForm />} />
        </Routes>
        </RecipeProvider>
        </IngredientProvider>
    )
}