import http from "../services/httpService";
const endPoint = "/genres";

export function getGenres() {
  return http.get(endPoint);
}

export function addGenre(genre){
  const body = {name: genre};
  return http.post(endPoint, body);
}

export function deleteGenre(genreId) {
  return http.delete(endPoint + "/" + genreId);
}

export function updateGenre(genre) {
  const genreId = genre._id;
  const body = {
    name: genre.name,
  };
  console.log(genre);
  return http.put(endPoint + "/" + genreId, body);
}
