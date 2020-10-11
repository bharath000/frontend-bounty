import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

const CharityPostad = (props) => {
    const form1 = useRef();
  const checkBtn1 = useRef();

  const [number_meals, setNumber_meals] = useState("");
  const [ad_desc, setAd_desc] = useState("");
 
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");


  const onChangeNum_meal = (e) => {
    const number_meals = e.target.value;
    setNumber_meals(number_meals);
  };

  const onChangeAd_desc = (e) => {
    const ad_desc = e.target.value;
    setAd_desc(ad_desc);
  };

  const postadscharity = (e) => {
    e.preventDefault();
   
    setMessage("");
    setSuccessful(false);

    form1.current.validateAll();

    if (checkBtn1.current.context._errors.length === 0) {
        const user = AuthService.getCurrentUser();
      AuthService.charitypostad(user.id, number_meals,ad_desc, "placed", user.zipcode).then(
        
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

//charityid ,mealcount, ad_desc, order_status, zipcode

return (
   
      <div className="card card-container">
        
        <h5>Fill the details to post request</h5>

        <Form onSubmit={postadscharity} ref={form1}>
          {!successful && (
            <div>
              <div className="form-group">
                
                <Input
                  type="text"
                  className="form-control"
                  name="number_meals"
                  placeholder = "number_meals"
                  value={number_meals}
                  onChange={onChangeNum_meal}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
               
                <Textarea
                  type="text"
                  className="form-control"
                  name="Description of Request"
                  placeholder = "Description of request"
                  value={ad_desc}
                  onChange={onChangeAd_desc}
                  validations={[required]}
                />
              </div>

            

           



              <div className="form-group">
                <button className="btn btn-primary btn-block">Post Request</button>
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
          <CheckButton style={{ display: "none" }} ref={checkBtn1} />
        </Form>
      </div>
    
  );


};

export default CharityPostad;