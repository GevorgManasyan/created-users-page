import React, { Component } from 'react';
import "./App.css";
import Profile from './components/profile/profile';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';





class App extends Component {
  render() {
    return ( 
      <div>
        
      <Router>
        
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/profile" exact component={Profile}></Route>
        <Route path="/" exact component={Login}></Route>
        
      </Router>
      </div> 
 

    );
  }
}

export default App;
