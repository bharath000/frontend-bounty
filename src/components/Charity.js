import React, { useState, useEffect, Component } from "react";

import UserService from "../services/user.service";
import Addprofile from "./Addprofile"

const Charity = () => {
  const [content, setContent] = useState("");
  const [user_content, setUserProfile] = useState("");
  
  
  useEffect(() => { 
    UserService.getUserProfile().then(
        (response)=>{
            setUserProfile(response.data);
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
      if (user_content !== "not found data"){
    UserService.getCharityBoard().then(
      (response) => {
        setContent(response.data);
       // alert('Your Role is: ' + response.data);
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
 

 if (user_content === "not found data")
 {return (
     
    <div className="container">

      <header className="jumbotron">
      <Addprofile></Addprofile>
        <h3>{user_content}</h3>
      </header>
    </div>
  
  )}
  else{
      return(<div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>)
  }
};

export default Charity;