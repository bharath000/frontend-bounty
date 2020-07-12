import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/auth/";

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
    return axios.post('http://localhost:8080/api/test/' + "addprofile", {
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

  export default {
    register,
    login,
    logout,
    addprofile,
    getCurrentUser,
  };