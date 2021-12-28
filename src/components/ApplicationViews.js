import { Route, Routes } from "react-router-dom";
import React from "react";
import { RecipeProvider } from "./recipe/RecipeProvider";
import { RecipeSearch } from "./recipe/RecipeSearch";
import { RecipeList } from "./recipe/RecipeList";
import { RecipeDetail } from "./recipe/RecipeDetails";
import { Home } from "./Home";
import { RecipeForm } from "./recipe/RecipeForm";






export const ApplicationViews = () => {

    return (
        <RecipeProvider>
        <Routes>
            <Route path="/*" element={<Home />} />
            <Route path ="/recipes/*" element={<><RecipeSearch /><RecipeList /></>}/>
            <Route path ="/recipes/create" element={<RecipeForm />}/>
            <Route path="/recipes/detail/:recipeId/*" element={<RecipeDetail />} />
            <Route path="recipes/edit/:recipeId/*" element={<RecipeForm />} />
        </Routes>
        </RecipeProvider>
    )
}