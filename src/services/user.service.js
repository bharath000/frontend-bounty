import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service"

//const API_URL = "http://localhost:8080/api/test/";
const API_URL = "https://backend-1595364106830.azurewebsites.net/api/test/";
const getPublicContent = () => {
    return axios.get(API_URL + "all");
  };

const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
  };

const getVolunterBoard = () => {
    return axios.get(API_URL + "volunter", { headers: authHeader() });
  };

const getRestaurentBoard = () => {
    return axios.get(API_URL + "restaurent", { headers: authHeader() });
  };
  const getCharityBoard = () => {
    return axios.get(API_URL + "charity", { headers: authHeader() });
  };
  const getUserProfile = () => {
    const user = AuthService.getCurrentUser();
          var user_id = user.id;
          console.log(user_id);
    return axios.get(API_URL + "profile/"+user_id, { headers: authHeader() });
    //.then(response => {
      // returning the data here allows the caller to get it through another .then(...)
      //return response.data
   // });
  };

  const getCharityAds =() =>{
    const user = AuthService.getCurrentUser();
          var user_id = user.id;
          return axios.get(API_URL+"charity/"+user_id+"/orders/now", { headers: authHeader() });
  }
  const getCharityOrder =(id) =>{
    return axios.get(API_URL+"charity/"+"orders/"+id, { headers: authHeader() });
  }
  const getOrderHistoryCharity =() =>{
    const user = AuthService.getCurrentUser();
          var user_id = user.id;
    return axios.get(API_URL+"charity/"+user_id+"/orders", { headers: authHeader() });

  }
   const getResAds = () =>{
    const user = AuthService.getCurrentUser();
    var zipcode = user.zipcode;
    return axios.get(API_URL+"restaurent/"+zipcode, { headers: authHeader() });
   }
   const getAcceptAd = (id) =>{
    
    return axios.get(API_URL+"restaurent/order/"+id+"/acc", { headers: authHeader() });
   }

   const getResOrderAccepted = () =>{
    const user = AuthService.getCurrentUser();
          var user_id = user.id;
    return axios.get(API_URL+"restaurent/resid/"+user_id, { headers: authHeader() });
   }

   const getCharityOrderAccepteddetals=(order_id)=>{
     console.log(order_id);
return axios.get(API_URL+"charity/order/accepted/"+order_id,{headers:authHeader()})
 .then(response => {
      // returning the data here allows the caller to get it through another .then(...)
      console.log(response.data)
      return response.data
    });

   }

  const getChariyOrderAccepted = () =>{
    const user = AuthService.getCurrentUser();
          var user_id = user.id;
    return axios.get(API_URL+"charity/order/history/"+user_id, { headers: authHeader() });
   }

export default {
    getPublicContent,
    getUserBoard,
    getVolunterBoard,
    getRestaurentBoard,
    getCharityBoard,
    getUserProfile,
    getCharityAds,
    getCharityOrder,
    getOrderHistoryCharity,
    getResAds,
    getAcceptAd,
    getResOrderAccepted,
    getCharityOrderAccepteddetals,
    getChariyOrderAccepted
  };