import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service"

const RestaurentOrders = () => {
    const [content, setContent] = useState("");
    const [user_role, setUserRole] = useState("");
    const currentUser = AuthService.getCurrentUser();
    useEffect(() => {
       
      
        UserService.getResOrderAccepted().then(
            (response) => {
              setUserRole(response.data);
                
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
       
       <i class="glyphicon glyphicon-resize-horizontal"></i>
       <div className="row"><div className="col-md-6">Order details</div><div className="col-md-6">Deliverey To...</div></div>
        <div className="flex-container">
           
        <div className="col-md-6">
        {user_role[0] && user_role[0].map((ad, index) => (
      <div key={index=ad.ad_id} className="card">
       
    
    <h6 class="card-title">{ad.ad_desc}</h6>
        
        
        <p class ="contentp">Number of meals required: {ad.number_meals}<br></br>
        Date: {ad.date}<br></br>
        Status: <span className="orderstatus">{ad.orderstatus}</span></p>
        
        
      
      </div>
      
     
    ))}</div>
    <div className="col-md-6">
  
      {user_role[1] && user_role[1].map((profile, index) => (
      <div key={index=profile.userid} className="card">
       
    
    <h6 class="card-title">{profile.organisation_name}</h6>
        
        
        <p className="contentp">{profile.organisation_name},
    {profile.streat},{profile.apt_number} <br></br>Phone: {profile.phone_number}<br></br>Zip: {profile.zipcode}</p>
        
        
      
      </div>
      
     
    ))}</div>
    
      </div>
      </div>


    );
  };
  
  export default RestaurentOrders;