import React, { useState, useEffect } from "react";
import Orders from "./Orders";
import { Link, Route, Switch ,} from "react-router-dom";
import UserService from "../services/user.service";
import Addprofile from "./Addprofile"
import CharityPostad from "./CharityPostad"
import CharityAds from "./CharityAds"
import CharityorderHistory from "./CharityorderHistory"

const Charity = () => {
  const [content, setContent] = useState("");
  const [user_content, setUserProfile] = useState("");
  const[orderid, setOrderId] = useState("");
  

 // var id = props.location.pathname.split("/")[3];
  //id = parseInt(id);
    //console.log(id);
  
  
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
        setUserProfile("");
       // alert('Your Role is: ' + response.data);
      // console.log(props);
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
     
    <div className="container-fluid">

      <header className="jumbotron">
       <Addprofile></Addprofile>
        <h3>{user_content}</h3>
      </header>
    </div>
  
  )}
  else{
      return(<div className="container-fluid">
      <div className="jumbotron">

        <h3>{content}</h3>
      </div>
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
      <h6>HOME</h6>
      <div className="container-fluid">
      <div className="row">
        <div className="col-md-3.2">
          <CharityPostad></CharityPostad>

        </div>
        <div className="col">
  <div className="flex-container">
      <CharityAds></CharityAds>
    </div>
</div>

      </div>
    
      </div>
    </div>
    <div id="menu1" class="container tab-pane fade"><br></br>
      <h3>Orders</h3>
    <CharityorderHistory></CharityorderHistory>
      
      
    </div>
    <div id="menu2" class="container tab-pane fade"><br></br>
      <h3>Menu 2</h3>
     
    </div>
  </div>
</div>










     
     
      <Route exact path = "charity/orders/:id" component = {Orders} />
     
    </div>)
  }
};

export default Charity;