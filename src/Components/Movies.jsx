import React, { useState, useEffect } from "react";
import { getMovies } from "../services/fakeMovieService";
import getGenres from "../services/fakeGenreService";
import MoviesTable from "./MoviesTable";
import Pagination from "./common/Pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/ListGroup.jsx";
import SearchBox from "./common/SearchBox";
import Box from "@mui/material/Box";
import _ from "lodash";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

// replace all bootstrap to material ui
// replace flex box with grid
// {make representMovies function call more general by figuring out how it can be call from
// useEffect hook}
// delete krne pe agar ek bhi item na bache to usse prev page pe le jao
// destructure every component where ever needed

function Movies() {
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenre] = useState([]);
  const [moviesToRender, setMoviesToRender] = useState();
  const [selectedGenre, setSelectedGenre] = useState();
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [sortCol, setSortCol] = useState({ path: "title", order: "asc" });
  const moviesPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      const moviesData = await getMovies();
      const genreData = [{ _id: 0, name: "All Genres" }, ...getGenres()];

      setAllMovies(moviesData);
      setGenre(genreData);
      // setCurrentPage(1);

      representMovies(moviesData);
    };

    fetchData();
  }, []);

  function representMovies(
    items = allMovies,
    curPage = currentPage,
    curGenre = selectedGenre,
    column = sortCol,
    query = searchQuery
  ) {
    // Filter Movies
    let filteredItems = [];
    if (curGenre && curGenre._id !== 0) {
      filteredItems = items.filter((item) => item.genre._id === curGenre._id);
    } else if (query && query.trim() !== "") {
      filteredItems = items.filter((item) =>
        item.title.toLowerCase().startsWith(query.toLowerCase())
      );
    } else filteredItems = items;

    // Sort Movies
    const sortedMovies = _.orderBy(
      filteredItems,
      column["path"],
      column["order"]
    );

    // Paginate Movies
    const newMoviesToRender = paginate(sortedMovies, curPage, moviesPerPage);

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
    setCurrentPage(1);
    setSearchQuery("");
    setSelectedGenre(genre);
    representMovies(allMovies, 1, genre);
  }

  function handleSort(col) {
    setSortCol(col);
    representMovies(allMovies, currentPage, selectedGenre, col);
  }

  function handleSearch(q) {
    setSearchQuery(q);
    setCurrentPage(1);
    setSelectedGenre(null);
    representMovies(allMovies, 1, null, sortCol, q);
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
            <Button
              component={Link}
              to="/movies/new"
              variant="contained"
              sx={{ width: "8rem", mb: "10px" }}
            >
              New Movie
            </Button>
            <p>
              {count === 0
                ? "There are no movies in the database"
                : `Showing ${moviesToRender.length} movies from the database`}
            </p>

            <SearchBox onSearch={handleSearch} query={searchQuery} />

            <div className="container">
              {count !== 0 && moviesToRender && (
                <div className="container">
                  <MoviesTable
                    sortColumn={sortCol}
                    movies={moviesToRender}
                    onLike={onLikeToggle}
                    onDelete={handleDelete}
                    onSort={handleSort}
                  />
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
