import React, { useState,  useEffect } from "react";
import Orders from "./Orders";
import SlidingPanel from 'react-sliding-side-panel';

import UserService from "../services/user.service";
import OrderAccepted from "./OrderAccepted";
import { Link, Route, Switch ,} from "react-router-dom";
const CharityAds = () => {
var index = "";
const [content, setContent] = useState("");
const [user_content, setUserProfile] = useState("");
const [ads, setAds] = useState([]);
const [id, setId] = useState("");
const [openPanel, setOpenPanel] = useState([]);
//<div className="container">{openPanel[0]?<Orders id={openPanel[1]}></Orders>:null}</div>
//console.log(props);
// const onChangeid=(v)=>{
//  const id = v;
//  setid(id);
 // console.log(id);
//};


useEffect(() => {

  //const interval = setInterval(() => {
   // setSeconds(seconds => seconds + 1);
  
 
    
  //}, 5000*100);
  //return () => clearInterval(interval);
  UserService.getCharityAds().then(
    (response) => {
      setAds(response.data);
     // console.log(response.data);
   //   alert('Your Role is: ' + response.data);
      
   if (!response.data){
setUserProfile("No data Found to show ");
   }
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
    
    <div className="flex-container">
        {content}{user_content}
    {ads && ads.map((ad, index) => (
      <div key={index=ad.ad_id} className="card">
          <Link to={"/charity/orders/"+ad.ad_id}>
    <h5>{ad.ad_desc}</h5> </Link>
        <button className="btn btn-primary" onClick={() => setOpenPanel([true,ad])}>Open</button>
        <div>
      <div>
    
       
      </div>
     
     
    </div>
        
        <p>Number of meals required: {ad.number_meals}</p>
        <p>Status: <span className="orderstatusp">{ad.orderstatus}</span></p>
        <SlidingPanel className = "container-fluid1"overlayClassName="container-fluid1"
        type={'right'}
        isOpen={openPanel[0]}
        size={30}
      >
        {openPanel[0]?(
        <div className="">
        <h6>
       
        </h6>
        
        < div className="card">
        <b>Order Summary</b>
        <h6>{openPanel[1].ad_desc}</h6>
        <p>Number of meals required: {openPanel[1].number_meals}<br></br>
    Date:{openPanel[1].date}<br></br>
        Status: <span className="orderstatusp">{openPanel[1].orderstatus}</span></p>
      <h6>Delivery Address</h6>
     
      <OrderAccepted order={openPanel[1]}></OrderAccepted>
      
     <br></br>
          <button className = "btn"onClick={() => setOpenPanel(false)}>close</button></ div>
        </div>)
        
        :null}
      </SlidingPanel>
        
      
      </div>
      
     
    ))}
    
   
  </div>
  
  );

};
export default CharityAds;