import React from "react";
import Like from "./common/Like";
import TableHeader from "./common/TableHeader";
import TableBody from "./common/TableBody";

function MoviesTable(props) {
  const { movies, onLike, onDelete, onSort, sortColumn } = props;

  const cols = [
    { path: "title", label: "Title" },
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
        <button
          onClick={() => onDelete(movie)}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
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
