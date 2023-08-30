import http from "../services/httpService";
const endPoint = "/genres";

export default function getGenres() {
  return http.get(endPoint);
}
