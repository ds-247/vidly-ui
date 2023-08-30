import http from "./httpService";
import config from "../config.json";
const apiEndPoint = config.apiUrl + "/users";

export async function register(user) {
    
  return http.post(apiEndPoint, {
    name: user.name,
    password: user.password,
    email: user.username,
  })
}