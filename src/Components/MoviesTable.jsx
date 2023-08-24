import React from "react";
import Like from "./common/Like";
import TableHeader from "./common/TableHeader";
import TableBody from "./common/TableBody";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function MoviesTable(props) {
  const { movies, onLike, onDelete, onSort, sortColumn } = props;

  const cols = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like onClick={() => onLike(movie)} liked={movie.liked} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={() => onDelete(movie)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <table className="table">
      <TableHeader columns={cols} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={movies} columns={cols} />
    </table>
  );
}

export default MoviesTable;
