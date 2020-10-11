import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";


const CharityOrders = props => {
    const [contents, setContent] = useState([]);
    const [profile, setProfile] = useState([]);
//var id = props.location.pathname.split("/")[3];
//UserService.getUserProfile()
  
   
    useEffect(() => {
      UserService.getUserProfile().then(data => {
        // response.json({ message: 'Request received!', data })
        setProfile(data);
        setContent("HI");
       })
       .catch(err => console.log(err));
 /*     UserService.getCharityOrder(props.id).then(
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
      );*/
    }, []);
  if (contents!== ""){
    
    return (
   
      <div className="container">
        
        < div className="card card-container">
        <h6>Delivery address</h6>
    <p>{profile.organisation_name},
    {profile.streat},{profile.apt_number} <br></br>Phone: {profile.phone_number}<br></br>Zip: {profile.zipcode}</p>
  
    
            </div>

      </div>
    );
  }
  };

  
  export default CharityOrders;