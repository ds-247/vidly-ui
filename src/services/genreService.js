import http from "../services/httpService";
import config from "../config.json";
const endPoint = config.apiUrl + "/genres";

export default function getGenres() {
  return http.get(endPoint);
}
