import { useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./Like";

function Movies() {
  const [movies, setMovies] = useState([...getMovies()]);

  function handleDelete(movie) {
    setMovies((prevValue) => {
      return prevValue.filter(($movie) => {
        return $movie._id !== movie._id;
      });
    });
  }

  return (
    <div className="container">
      <div className="container">
        <p>
          {movies.length === 0
            ? "There are no movies in the database"
            : `Showing ${movies.length} movies from the database`}
        </p>
      </div>

      {movies.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {movies.map(($movie, index) => {
              const { title, genre, numberInStock, dailyRentalRate } = $movie;
              return (
                <tr key={$movie._id}>
                  <td>{index + 1}</td>
                  <td>{title}</td>
                  <td>{genre.name}</td>
                  <td>{numberInStock}</td>
                  <td>{dailyRentalRate}</td>
                  <td>
                    <Like />
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete($movie)}
                      type="button"
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Movies;
