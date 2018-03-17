import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import Home from "./Home/Home"; 
import Dashboard from "./Dashboard.js"; 
import Login from "./Login.js"; 
import Register from "./Register.js"; 
import Navbar from "./Navbar/Navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router><div>
            <Navbar />
            
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </div></Router>
      </div>
    );
  }
}

export default App;