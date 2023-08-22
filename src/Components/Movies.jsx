import React, { useState, useEffect } from "react";
import { getMovies } from "../services/fakeMovieService";
import getGenres from "../services/fakeGenreService";
import Like from "./common/Like";
import Pagination from "./common/Pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/ListGroup.jsx";
import Box from "@mui/material/Box";

// replace all bootstrap to material ui

function Movies() {
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState();
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const moviesPerPage = 4;

  const [moviesToRender, setMoviesToRender] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const moviesData = await getMovies();
      const genreData = [{ _id: 0, name: "All Genres" }, ...getGenres()];

      setAllMovies(moviesData);
      setGenre(genreData);

      representMovies(moviesData);
    };

    fetchData();
  }, []); // Include currentPage and selectedGenre in the dependency array

  function representMovies(
    items = allMovies,
    curPage = 1,
    curGenre = selectedGenre
  ) {
    // Filter Movies
    const filteredItems =
      curGenre && curGenre._id !== 0
        ? items.filter(($movie) => $movie.genre._id === curGenre._id)
        : items;

    // Paginate Movies
    const newMoviesToRender = paginate(filteredItems, curPage, moviesPerPage);

    // set states that depends on movies (cur page is not set here )
    const count = filteredItems.length;
    const pages = Math.ceil(count / moviesPerPage);

    setCount(count);
    setTotalPages(pages);
    setMoviesToRender(newMoviesToRender);
  }

  function handlePageChange(e, curPage) {
    const newStartIndex = (curPage - 1) * moviesPerPage;
    setStartIndex(newStartIndex);

    setCurrentPage(curPage);
    representMovies(allMovies, curPage);
  }

  function onLikeToggle(movie) {
    const updatedMovies = allMovies.map(($movie) => {
      if ($movie._id === movie._id) {
        return { ...$movie, liked: !$movie.liked };
      }
      return $movie;
    });

    setAllMovies(updatedMovies);
    representMovies(updatedMovies, currentPage);
  }

  function handleDelete(movie) {
    const updatedMovies = allMovies.filter(
      ($movie) => $movie._id !== movie._id
    );
    setAllMovies(updatedMovies);
    representMovies(updatedMovies, currentPage);
  }

  function handleGenreSelect(genre) {
    setCurrentPage(1); // Reset the current page to 1 when a new genre is selected
    setSelectedGenre(genre);
    representMovies(allMovies, 1, genre);
  }

  return (
    <>
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 1,
            m: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 1,
              m: 1,
              width: "20%",
            }}
          >
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={handleGenreSelect}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 1,
              m: 1,
              flexGrow: 1,
            }}
          >
            <div className="container">
              <p>
                {count === 0
                  ? "There are no movies in the database"
                  : `Showing ${moviesToRender.length} movies from the database`}
              </p>
            </div>

            <div className="container">
              {count !== 0 && moviesToRender && (
                <div className="container">
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
                      {moviesToRender.map(($movie, index) => {
                        const { title, genre, numberInStock, dailyRentalRate } =
                          $movie;
                        return (
                          <tr key={$movie._id}>
                            <td>{index + 1}</td>
                            <td>{title}</td>
                            <td>{genre.name}</td>
                            <td>{numberInStock}</td>
                            <td>{dailyRentalRate}</td>
                            <td>
                              <Like
                                onClick={() => onLikeToggle($movie)}
                                liked={$movie.liked}
                              />
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
                  <Pagination
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    page={currentPage}
                  />
                </div>
              )}
            </div>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Movies;
