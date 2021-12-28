import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Cookbook } from './components/Cookbook';
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Cookbook />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


