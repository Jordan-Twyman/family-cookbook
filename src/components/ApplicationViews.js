import { Route, Routes } from "react-router-dom";
import React from "react";





export const ApplicationViews = () => {

    return (
        <Routes>
            <Route path ="/recipes" element={<p>Recipe List</p>}/>
        </Routes>
    )
}