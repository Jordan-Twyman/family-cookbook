import React, { useRef } from "react"
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Logout.css"

export const Logout = (props) =>{
    const navigate = useNavigate()
    const email = useRef()
    const existDialog = useRef()

    const handleLogout = (e) => {
        e.preventDefault()

        localStorage.removeItem("activeUser")
                
        navigate("/login") 
        window.location.reload(false);
        }

    return (
        <>
        <button id="logout-button" className="btn btn-secondary btn-danger" onClick={handleLogout}>Log Out</button>
        </>
    )
}