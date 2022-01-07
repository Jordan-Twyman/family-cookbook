import  { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import { yellow } from '@mui/material/colors';
import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

class NavBar extends Component {
    render () {
        return (
            <nav className="navbar text-white flex-md-nowrap p-0 shadow">
            <ul className="nav nav-pills nav-fill">
            <div className="main-image-first">
<p></p>
{/* <img className="navLogo" src={require('./icon.png')}  alt="logo" /> */}
</div>
<div className="navContainer">
                <li className="nav-item">
                    <Link className="nav-link" to="/"><HomeIcon className="nav-link" fontSize="large" sx={{ color: yellow[100] }} /></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/recipes" ><div className="nav-link">Recipes</div></Link>
                </li>
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/ingredients">Grocery List</Link>
                </li>  */}
                <li className="nav-item">
                    <Link className="nav-link" to="/menu"><div className="nav-link">Menu</div></Link>
                </li>    
                </div>
                </ul>
                </nav>      )
    }
}

export default NavBar