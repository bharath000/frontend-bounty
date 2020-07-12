import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service"

const API_URL = "http://localhost:8080/api/test/";

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
    return axios.get(API_URL + "profile/"+user_id, { headers: authHeader() });
  };

export default {
    getPublicContent,
    getUserBoard,
    getVolunterBoard,
    getRestaurentBoard,
    getCharityBoard,
    getUserProfile
  };