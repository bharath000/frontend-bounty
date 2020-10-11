import React, { useState, useEffect } from "react";
import { RoutedTabs, NavTab } from "react-router-tabs";
import { BrowserRouter as Router, Switch, Route, Link, Re } from "react-router-dom";
import UserService from "../services/user.service";
import Addprofile from "./Addprofile"
const Profile = () => {
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
        <p>HI this is your Profile</p>
          
         
        </header>
     
  
       
        <h6 class="card-title">{user_content.organisation_name}</h6>
        
        
        <p className="contentp">{user_content.organisation_name},
    {user_content.streat},{user_content.apt_number} <br></br>Phone: {user_content.phone_number}<br></br>Zip: {user_content.zipcode}</p>
  <p>{user_content.organisation_name}</p>
        
       
     
       
      </div>)
  }
  };
  
  export default Profile;