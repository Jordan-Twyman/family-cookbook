import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const MenuContext = createContext()

// This component establishes what data can be used.
export const MenuProvider = (props) => {
    const [menus, setMenu] = useState([])


    const getMenu = () => {
        return fetch("http://localhost:8088/recipeUsers")
        .then(res => res.json())
        .then(setMenu)
    }

    const addMenu = dinnerObj => {
        return fetch("http://localhost:8088/recipeUsers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dinnerObj)
        })
        .then(getMenu)
    }

    
    const madeIt = (menuId, isComplete) => {
        return fetch(`http://localhost:8088/recipeUsers/${menuId}`, {
            method: "PATCH",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                madeIt: isComplete,
            }),
        }).then(getMenu)}

    return (
        <MenuContext.Provider value={{
            menus, getMenu, addMenu, madeIt
        }}>
            {props.children}
        </MenuContext.Provider>
    )

}