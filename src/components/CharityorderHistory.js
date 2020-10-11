import React, { useState, useEffect, useRef } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

const CharityOrdersHis = () => {
    const [content, setContent] = useState("");
    const [user_role, setUserRole] = useState("");
    const[confirmid,setConfirmid] = useState([]);
    const currentUser = AuthService.getCurrentUser();
    
    const checkBtn3 = useRef();
    const form3 = useRef();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const ConfirmOrderDelivery = (e) => {
        e.preventDefault();
     
      setMessage("");
      setSuccessful(false);
        // let selectedWord = window.getSelection().toString();
        if (checkBtn3.current.context._errors.length === 0) {
          const user = AuthService.getCurrentUser();
        //  const adsid = openPanel[1].ad_id;
         // console.log(adsid);
        AuthService.orderconfirmd(confirmid[0]).then(
        
          
          (response) => {
              //const user = AuthService.getCurrentUser();
              //props.history.push("/"+user.role[0].authority.slice(5));
              //window.location.href = "/"+ user.role[0].authority.slice(5);
              alert('Your Request has done ' + response.data);
              
            //  props.history.push("/charity");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setMessage(resMessage);
            setSuccessful(false);
          }
        );
       
      }
  
       };


    useEffect(() => {
       
      
        UserService.getChariyOrderAccepted().then(
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
       <div className="row"><div className="col-md-6">Order details</div><div className="col-md-6">Deliverey By...</div></div>
        <div className="flex-container">
           
        <div className="col-md-6">
        {user_role[0] && user_role[0].map((ad, index) => ( ad.orderstatus === "accepted"?
      <div key={index=ad.ad_id} className="card">
       
    
    <h6 class="card-title">{ad.ad_desc}</h6>
        
        
        <p class ="contentp">Number of meals required: {ad.number_meals}<br></br>
        Date: {ad.date}<br></br>
        Status: <span className="orderstatus">{ad.orderstatus}</span></p>

        <Form onSubmit={ConfirmOrderDelivery} ref={form3}>
          {!successful && (
            <div>
              <div className="form-group">
                <button onClick = {() => setConfirmid([ad.ad_id])}className="btn btn-primary ">Confirm</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn3} />
        </Form>
        
      
      </div>:
      <div key={index=ad.ad_id} className="card">
       
    
      <h6 class="card-title">{ad.ad_desc}</h6>
          
          
          <p class ="contentp">Number of meals required: {ad.number_meals}<br></br>
          Date: {ad.date}<br></br>
          Status: <span className="orderstatus">{ad.orderstatus}</span></p>
  
         
          
        
        </div>

      
     
    ))}</div>
    <div className="col-md-6">
  
      {user_role[1] && user_role[1].map((profile, index) => ( profile === null ? <div key={index} className="card">
          
          <h6 class="card-title">Data Not Found/Order has not been Placed</h6>
        
        
        <p className="contentp"><br></br><br></br><br></br></p>
        <button className="btn btn-primary"></button>
      </div>:
        
      <div key={index} className="card">
       
    
    <h6 class="card-title">{profile.organisation_name}</h6>
        
        
        <p className="contentp">{profile.organisation_name},
    {profile.streat},{profile.apt_number} <br></br>Phone: {profile.phone_number}<br></br>Zip: {profile.zipcode}</p>
        
        
      
      </div>
      
     
    ))}</div>
    
      </div>
      </div>


    );
  };
  
  export default CharityOrdersHis;