import { Route, Routes } from "react-router-dom";
import React from "react";
import { RecipeProvider } from "./recipe/RecipeProvider";
import { RecipeSearch } from "./recipe/RecipeSearch";
import { RecipeList } from "./recipe/RecipeList";
import { RecipeDetail } from "./recipe/RecipeDetails";
import { Home } from "./Home";






export const ApplicationViews = () => {

    return (
        <RecipeProvider>
        <Routes>
            <Route path="/*" element={<Home />} />
            <Route path ="/recipes/*" element={<><RecipeSearch /><RecipeList /></>}/>
            <Route path="/recipes/detail/:recipeId/*" element={<RecipeDetail />} />
        </Routes>
        </RecipeProvider>
    )
}