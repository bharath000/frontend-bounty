import React, { useState, useEffect,useRef } from "react";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import UserService from "../services/user.service";

const OrderAccpted = props =>{

    const [contents, setContent] = useState([ ]);
    const [profile, setProfile] = useState([]);
    const[status, setStatus] = useState("");
    const[confirmid,setConfirmid] = useState([]);
    const checkBtn4 = useRef();
    const form4 = useRef();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
//console.log(props);
const orderdetails = props.order;
var status1 = orderdetails.orderstatus; 
//console.log(orderdetails);
var x = orderdetails.ad_id;
const ConfirmOrderDelivery = (e) => {
    e.preventDefault();
 
  setMessage("");
  setSuccessful(false);
    // let selectedWord = window.getSelection().toString();
    if (checkBtn4.current.context._errors.length === 0) {
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
   // setStatus(status1);

    if(orderdetails.orderstatus === "accepted"){
        UserService.getCharityOrderAccepteddetals(x).then
            (data => {
                // response.json({ message: 'Request received!', data })
                setProfile(data);
                setContent("HI");
               })
               .catch(err => console.log(err));
    }
 
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

 if (orderdetails.orderstatus  == "placed"){
    
        return (
       
          <div className="container">
            
           
            <p>Your order is Processing</p>
        
      
        <div className="spinner-border text-primary" role="status">
    <span className="sr-only">Loading...</span>
  </div>
                </div>
    
    
        );
      }
      else if(orderdetails.orderstatus  == "accepted"){
        return(
<div>
    order is accpeted and deleivering by
    <div class="spinner-grow spinner-grow-sm text-primary"></div>
    <p>{profile.organisation_name},
    {profile.streat},{profile.apt_number} <br></br>Phone: {profile.phone_number}</p>
    <Form onSubmit={ConfirmOrderDelivery} ref={form4}>
          {!successful && (
            <div>
              <div className="form-group">
                <button onClick = {() => setConfirmid([orderdetails.ad_id])}className="btn btn-primary ">Confirm</button>
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
          <CheckButton style={{ display: "none" }} ref={checkBtn4} />
        </Form>
        
</div>



        );




      }

      else if(orderdetails.orderstatus  == "delivered"){

   return(
<div>
    order is delivered
</div>



        );
      }


};
export default OrderAccpted;