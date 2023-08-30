import http from "./httpService";
import jwtDecode from "jwt-decode";
const apiEndPoint = "/auth";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, {
    password: password,
    email: email,
  });

  loginWithJwt(jwt.token);
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
    return jwtDecode(jwt);
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
