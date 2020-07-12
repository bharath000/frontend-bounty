import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Route , withRouter} from 'react-router-dom';
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
const vzipcode = (value) => {
    if (value.length !== 5) {
      return (
        <div className="alert alert-danger" role="alert">
          The zipcode must contain 6  characters.
        </div>
      );
    }
  };
  


const Addprofile = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [orgname, setOrgname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [aptnumber, setAptnumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [streat, setStreat] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeOrgname = (e) => {
    const orgname = e.target.value;
    setOrgname(orgname);
  };

  const onChangePhone = (e) => {
    const phonenumber = e.target.value;
    setPhonenumber(phonenumber);
  };

  const onChangeStreat = (e) => {
    const streat = e.target.value;
    setStreat(streat);
  };

  const onChangeZipcode = (e) => {
    const zipcode = e.target.value;
    setZipcode(zipcode);
  };

  const onChangeAptnumber = (e) =>{
      const aptnumber = e.target.value;
      setAptnumber(aptnumber)
  }

  


  const handleRegister = (e) => {
    e.preventDefault();
   
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
        const user = AuthService.getCurrentUser();
      AuthService.addprofile(user.id, user.role[0].authority, user.email, zipcode, orgname, phonenumber, streat, aptnumber).then(
        
        () => {
            const user = AuthService.getCurrentUser();
            //props.history.push("/"+user.role[0].authority.slice(5));
            window.location.href = "/"+ user.role[0].authority.slice(5);
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

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                
                <Input
                  type="text"
                  className="form-control"
                  name="oraganisation_name"
                  placeholder = "organisation_name"
                  value={orgname}
                  onChange={onChangeOrgname}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
               
                <Input
                  type="text"
                  className="form-control"
                  name="phonenumber"
                  placeholder = "phonenumber"
                  value={phonenumber}
                  onChange={onChangePhone}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                
                <Input
                  type="text"
                  className="form-control"
                  name="streat"
                  placeholder = "streat"
                  value={streat}
                  onChange={onChangeStreat}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                
                <Input
                  type="zipcode"
                  className="form-control"
                  name="zipcode"
                  placeholder = "zipcode"
                  value={zipcode}
                  onChange={onChangeZipcode}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                
                <Input
                  type="text"
                  className="form-control"
                  name="apt_number"
                  placeholder = "apt_number"
                  value={aptnumber}
                  onChange={onChangeAptnumber}
                  validations={[required]}
                />
              </div>

           



              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
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
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Addprofile;