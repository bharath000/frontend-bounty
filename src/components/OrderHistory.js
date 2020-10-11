import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service"

const CharitHistoryOrder = () => {
    const [content, setContent] = useState("");
    const [user_role, setUserRole] = useState("");
    const currentUser = AuthService.getCurrentUser();
const toggleButtonState = () => {
       // let selectedWord = window.getSelection().toString();
       UserService.getOrderHistoryCharity().then(
         user_role => {
            setUserRole(user_role.data);
            console.log(user_role.data);
              
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
        
        );
      };
    useEffect(() => {
       
      
        UserService.getCharityBoard().then(
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
          );
      
    }, []);
  
    return (
      <div className="container-fluid">
        <header className="jumbotron">
          <h3>{content}</h3>
          <button class = "btn btn-primary" onClick={toggleButtonState}>Open</button>
        </header>

        <div className="flex-container">
           
               
        {user_role && user_role.map((ad, index) => (
      <div key={index=ad.ad_id} className="card-flex1">
       
    <h5>{ad.ad_desc}</h5> 
       
        <div>
      <div>
    
       
      </div>
     
     
    </div>
        
        <p>Number of meals required: {ad.number_meals}</p>
        <p>Status: {ad.order_status}</p>
        
        
      
      </div>
      
     
    ))}
      </div>
      </div>


    );
  };
  
  export default CharitHistoryOrder;