import React, { useState } from "react";
import NavBar from "./nav/NavBar";
import {ApplicationViews} from "./ApplicationViews";
import "./Cookbook.css";
import { Routes, Route, Navigate } from "react-router";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Logout} from './auth/Logout'


export const Cookbook = () => {
  const [loggedin, setLoggedin] = useState(false);

  const changeState = (bool) => setLoggedin(bool);

  if (localStorage.getItem("activeUser")) {
    return (
      <>
        <NavBar />
        <Logout />
        <ApplicationViews />
      </>
    );
  } else {
    return (
      <>
      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="/login" element={<Login setLoggedin={changeState} />} />
        <Route path="/register" element={<Register setLoggedin={changeState} />} />
      </Routes>
      <div className="imageContainer"> <img className="navLogo" src={require('./icon.png')}  alt="logo" /></div>
      </>

    );
  }
};