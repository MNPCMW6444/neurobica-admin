import axios from "axios";
import domain from "../domain";

const API_URL = domain + "/";
/* const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
}; */
const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      name: username,
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
  return JSON.parse(localStorage.getItem("user")) === null
    ? false
    : JSON.parse(localStorage.getItem("user"));
};
const AuthService = {
  login,
  logout,
  getCurrentUser,
};
export default AuthService;
