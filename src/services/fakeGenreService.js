import http from '../services/httpService';
const endPoint = "http://localhost:3000/api/genres";

export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
];

export default async function getGenres() {
  return http.get(endPoint);
}
