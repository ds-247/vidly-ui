import React, { useState, useEffect, useCallback } from "react";
import { deleteMovie, getMovies, saveMovie } from "../services/movieService";
import getGenres from "../services/genreService";
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

function Movies({ user }) {
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenre] = useState([]);
  const [moviesToRender, setMoviesToRender] = useState();
  const [selectedGenre, setSelectedGenre] = useState();
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  // const [startIndex, setStartIndex] = useState(0);
  const [sortCol, setSortCol] = useState({ path: "title", order: "asc" });
  const moviesPerPage = 4;

  const representMovies = useCallback(
    (
      items = allMovies,
      curPage = currentPage,
      curGenre = selectedGenre,
      column = sortCol,
      query = searchQuery
    ) => {
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
    },
    [allMovies, currentPage, selectedGenre, sortCol, searchQuery]
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data: moviesData } = await getMovies();
      let { data: genreData } = await getGenres();
      genreData = [{ _id: 0, name: "All Genres" }, ...genreData];

      setAllMovies(moviesData);
      setGenre(genreData);

      representMovies(moviesData);
    };

    fetchData();
  }, [
    allMovies,
    currentPage,
    selectedGenre,
    sortCol,
    searchQuery,
    representMovies,
  ]);

  function handlePageChange(e, curPage) {
    // const newStartIndex = (curPage - 1) * moviesPerPage;
    // setStartIndex(newStartIndex);

    setCurrentPage(curPage);
  }

  async function onLikeToggle(movie) {
    movie.liked = !movie.liked;

    const body = _.pick(movie, [
      "_id",
      "title",
      "dailyRentalRate",
      "numberInStock",
      "liked",
    ]);
    body.genreId = movie.genre._id;

    try {
      await saveMovie(body);
    } catch (ex) {}
  }

  // optimistic delete method
  async function handleDelete(movie) {
    const originalMovies = allMovies;
    const updatedMovies = allMovies.filter(
      ($movie) => $movie._id !== movie._id
    );
    setAllMovies(updatedMovies);

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // toast.error("The movie has already been deleted...");
        // console.log("here goes the toast mssg movie is already deleted");

        setAllMovies(originalMovies);
      }
    }
  }

  function handleGenreSelect(genre) {
    setCurrentPage(1);
    setSearchQuery("");
    setSelectedGenre(genre);
  }

  function handleSort(col) {
    setSortCol(col);
  }

  function handleSearch(q) {
    setSearchQuery(q);
    setCurrentPage(1);
    setSelectedGenre(null);
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
            {user && (
              <Button
                component={Link}
                to="/movies/new"
                variant="contained"
                sx={{ width: "8rem", mb: "10px" }}
              >
                New Movie
              </Button>
            )}
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

// const representMovies = useCallback(
//   (
//     items = allMovies,
//     curPage = currentPage,
//     curGenre = selectedGenre,
//     column = sortCol,
//     query = searchQuery
//   ) => {
//     let filteredItems = [];
//     if (curGenre && curGenre._id !== 0) {
//       filteredItems = items.filter((item) => item.genre._id === curGenre._id);
//     } else if (query && query.trim() !== "") {
//       filteredItems = items.filter((item) =>
//         item.title.toLowerCase().startsWith(query.toLowerCase())
//       );
//     } else filteredItems = items;

//     // Sort Movies
//     const sortedMovies = _.orderBy(
//       filteredItems,
//       column["path"],
//       column["order"]
//     );

//     // Paginate Movies
//     const newMoviesToRender = paginate(sortedMovies, curPage, moviesPerPage);

//     // set states that depends on movies (cur page is not set here )
//     const count = filteredItems.length;
//     const pages = Math.ceil(count / moviesPerPage);

//     setCount(count);
//     setTotalPages(pages);
//     setMoviesToRender(newMoviesToRender);
//   },
//   [allMovies, currentPage, selectedGenre, sortCol, searchQuery]
// );
