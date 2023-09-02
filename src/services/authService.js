import http from "./httpService";
import jwtDecode from "jwt-decode";
const apiEndPoint = "/auth";

http.setJwt(getJwt());

export async function login(email, password) {
  try {
    const response = await http.post(apiEndPoint, {
      password: password,
      email: email,
    });

    const jwt = response.data;
    loginWithJwt(jwt.token);

    return jwt.token;
  } catch (error) {
    throw error;
  }
}

export function loginWithJwt(token) {
  localStorage.setItem("token", token);
}

export function getJwt() {
  return localStorage.getItem("token");
}

export async function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    const data = jwtDecode(jwt);

    // console.log(data,"decoded token");
    return data;
  } catch (ex) {
    return null;
  }
}

const funx = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};

export default funx;
