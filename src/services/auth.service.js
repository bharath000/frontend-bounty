import axios from "axios";
import authHeader from "./auth-header";
//const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "https://backend-1595364106830.azurewebsites.net/api/auth/";

//https://backend-1595364106830.azurewebsites.net/

const register = (username, email, password, user_role, zipcode) => {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      user_role,
      zipcode
    });
  };

  const login = (usernameOrEmail, password) => {
    return axios
      .post(API_URL + "signin", {
        usernameOrEmail,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  //const user = JSON.parse(localStorage.getItem("user"));
  
  const addprofile = (user_id, user_role, email, zipcode, organisation_name, phone_number, streat, apt_number) => {
    return axios.post('https://backend-1595364106830.azurewebsites.net/api/test/' + "addprofile", {
      user_id,
      user_role,
      email,
      zipcode,
      organisation_name,
      phone_number,
      streat,
      apt_number
    },{ headers: authHeader() });
  };

  const charitypostad = (charityid, number_meals, ad_desc, order_status, zipcode) => {
    return axios.post('https://backend-1595364106830.azurewebsites.net/api/test/'+'charity_ads',{
      charityid,
      number_meals,
      ad_desc,
      order_status,
      zipcode
    },{headers:authHeader()});
  };

  const respostad = (resid, adsid) => {
    //const user = getCurrentUser();
    //var id = user.userid;
    return axios.post('https://backend-1595364106830.azurewebsites.net/api/test/'+"restaurent/order/"+adsid+"/acc",{
    resid, 
    adsid
    },{headers:authHeader()});
  };

  const orderconfirmd = (adsid) => {
    //const user = getCurrentUser();
    //var id = user.userid;
    return axios.post('https://backend-1595364106830.azurewebsites.net/api/test/'+"charity/order/confirmation/{id}",{
    adsid
    },{headers:authHeader()});
  };



  export default {
    register,
    login,
    logout,
    addprofile,
    getCurrentUser,
    charitypostad,
    respostad,
    orderconfirmd
  };