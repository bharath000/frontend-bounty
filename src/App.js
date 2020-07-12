import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Volunter from "./components/Volunter";
//import Restaurent from "./components/Restaurent"
import Charity from "./components/Charity"
import Restaurent from "./components/Restaurent"
const App = ()=> {

  const [showVolunter, setShowVolunter] = useState(false);
  const [showRestaurent, setShowRestaurent] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [setCharity, setShowCharity] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowVolunter(user.role.includes("ROLE_VOLUNTER"));
      setShowRestaurent(user.role.includes("ROLE_RESTAURENT"));
      setShowCharity(user.role.includes("ROLE_CHARITY"));
      setShowAdminBoard(user.role.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Bounty
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showVolunter && (
              <li className="nav-item">
                <Link to={"/volunter"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/"+currentUser.role[0].authority.slice(5)} className="nav-link">
                  {currentUser.role[0].authority.slice(5)}
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/volunter" component={Volunter} />
            <Route path="/restaurent" component={Restaurent}/>
            <Route path = "/charity" component={Charity} />
           
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
