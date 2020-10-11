import React, { useState, useEffect } from "react";
import { RoutedTabs, NavTab } from "react-router-tabs";
import { BrowserRouter as Router, Switch, Route, Link, Re } from "react-router-dom";
import UserService from "../services/user.service";
import Addprofile from "./Addprofile"
import Resorder from "./Resorder"
import ResAccept from "./ResAccept"

const Res = () => {
  const [content, setContent] = useState("");
  const [user_content, setUserProfile] = useState("");

  useEffect(() => {
    UserService.getUserProfile().then(
      (response)=>{
          setUserProfile(response.data);
          console.log(user_content)
      },
 
  (error) => {
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setUserProfile(_content);

    } );
    if(user_content !== "not found data"){
    UserService.getRestaurentBoard().then(
      (response) => {
        setContent(response.data);
     //   alert('Your Role is: ' + response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );}
  }, []);

  if (user_content === "not found data"){
  return (
    <div className="container-fluid">
      <header className="jumbotron">
      <Addprofile></Addprofile>
        <h3>{user_content}</h3>
      </header>
    </div>
  )}
  else{
    return(<div className="container-fluid">
      <header className="jumbotron">

        <h3>{content}</h3>
       
      </header>
   

      <div className="container">
      <ul className="nav nav-tabs" role="tablist">
    <li class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="#home">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#menu1">Orders</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#menu2">Menu 2</a>
    </li>
  </ul>
      <div class="tab-content">
    <div id="home" class="container tab-pane active"><br></br>
      <h3>HOME</h3>
      <p>plesae look the adds posted today.</p>
    <Resorder></Resorder>
    </div>
    <div id="menu1" class="container tab-pane fade"><br></br>
      <h3>Accepted Orders</h3>
      
      <ResAccept></ResAccept>
    </div>
    <div id="menu2" class="container tab-pane fade"><br></br>
      <h3>Menu 2</h3>
     
    </div>
  </div>
</div>


      
     
   
     
    </div>)
}
};

export default Res;