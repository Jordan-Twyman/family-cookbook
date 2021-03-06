import  { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import { yellow } from '@mui/material/colors';
import FoodBankIcon from '@mui/icons-material/FoodBank';



class NavBar extends Component {
    render () {
        return (
            <nav className="navbar text-white flex-md-nowrap p-0 shadow fixed-top">
            <ul className="nav nav-pills nav-fill">
            <div className="main-image-first">
<p></p>
{/* <img className="navLogo" src={require('./icon.png')}  alt="logo" /> */}
</div>
<div className="navContainer">
                <li className="nav-item">
                    <Link className="nav-link" to="/"><FoodBankIcon className="nav-link" fontSize="large" sx={{ color: yellow[100] }} /></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/recipes" ><div className="nav-link">My Recipes</div></Link>
                </li>
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/ingredients">Grocery List</Link>
                </li>  */}
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/menu"><div className="nav-link">Shopping List</div></Link>
                </li>     */}
                </div>
                </ul>
                </nav>      )
    }
}

export default NavBar