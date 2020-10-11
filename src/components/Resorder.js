import React, { useState,  useEffect,useRef } from "react";
import UserService from "../services/user.service";
import { Link, Route, Switch ,} from "react-router-dom";
import SlidingPanel from 'react-sliding-side-panel';
import AuthServices from "../services/auth.service"
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import OrderAccepted from "./OrderAccepted";


const  Resorder = () => {
    const [content, setContent] = useState("");
    const [ads, setAds] = useState([]);
    const [openPanel, setOpenPanel] = useState([]);
    const [user_role, setUserRole] = useState("");
    const checkBtn2 = useRef();
    const form2 = useRef();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const AcceptOrder = (e) => {
      e.preventDefault();
   
    setMessage("");
    setSuccessful(false);
      // let selectedWord = window.getSelection().toString();
      if (checkBtn2.current.context._errors.length === 0) {
        const user = AuthService.getCurrentUser();
        const adsid = openPanel[1].ad_id;
        console.log(adsid);
      AuthService.respostad(user.id,adsid).then(
      
        
        (response) => {
            //const user = AuthService.getCurrentUser();
            //props.history.push("/"+user.role[0].authority.slice(5));
            //window.location.href = "/"+ user.role[0].authority.slice(5);
            alert('Your Request has been Placed is: ' + response.data);
            
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
       
      
      UserService.getResAds().then(
          (response) => {
            setAds(response.data);
              
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
     

      <div className="flex-container">
         
             
      {ads && ads.map((ad, index) => (
    <div key={index=ad.ad_id} className="card-flex1">
     
  <h5>{ad.ad_desc}</h5> 
  <button className="btn btn-primary" onClick={() => setOpenPanel([true,ad])}>View Order</button>
      <div>
    <div>
  
     
    </div>
   
   
  </div>
  
  
  <SlidingPanel className = "flex-container1"overlayClassName="container-fluid1"
        type={'top'}
        isOpen={openPanel[0]}
        size={50}
      >
        {openPanel[0]?(
        <div className="container-fluid1">
        <header>
        Order Summary
        </header>
        < div className="row">
          <div className="col-md-4">
        <h6>{openPanel[1].ad_desc}</h6>
        <p>Number of meals required: {openPanel[1].number_meals}</p>
    <p>Date:{openPanel[1].date}</p>
        <p>Status: {openPanel[1].orderstatus}</p></div>
<div className="col-md-4">
      <h4>Delivery Address</h4>
      
      <button onClick={() => setOpenPanel(false)}>close</button></ div>

      <div className="col-md-4">
      <h4>click button to accept the order</h4>
      <p>Status: {openPanel[1].ad_id}</p>
      <Form onSubmit={AcceptOrder} ref={form2}>
          {!successful && (
            <div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Accept</button>
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
          <CheckButton style={{ display: "none" }} ref={checkBtn2} />
        </Form>
      </ div>

      </div>
      
<br></br>
         
        </div>
        
        ):null}
      </SlidingPanel>



      <p>Number of meals required: {ad.number_meals}</p>
      <p>Status: {ad.orderstatus}</p>
      
      
    
    </div>
    
   
  ))}
    </div>
    </div>


  );
};
export default Resorder;