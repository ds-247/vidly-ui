import http from "./httpService";
import config from "../config.json";
const apiEndPoint = config.apiUrl + "/movies";

export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(id) {
  return http.get(apiEndPoint + "/" + id);
}

export async function saveMovie(movie) {
  const body = { ...movie };
  delete body._id;

  if (movie._id === "new") {
    return await http.post(apiEndPoint, body);
  } else {
    return await http.put(apiEndPoint + "/" + movie._id, body);
  }
}

export function deleteMovie(movieId) {
  return http.delete(apiEndPoint + "/" + movieId);
}
