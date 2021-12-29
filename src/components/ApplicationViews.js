import { Route, Routes } from "react-router-dom";
import React from "react";
import { RecipeProvider } from "./recipes/RecipeProvider";
import { RecipeSearch } from "./recipes/RecipeSearch";
import { RecipeList } from "./recipes/RecipeList";
import { RecipeDetail } from "./recipes/RecipeDetails";
import { Home } from "./Home";
import { RecipeForm } from "./recipes/RecipeForm";






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