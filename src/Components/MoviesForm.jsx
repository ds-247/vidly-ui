import React, { useState, useEffect } from "react";
import Input from "./common/Input";
import Joi from "joi-browser";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import getGenres from "../services/fakeGenreService";
import DropDown from "./common/DropDown";

function MoviesForm({ match, history }) {
  const [data, setData] = useState({
    _id: "new",
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });
  const [genres, setGenre] = useState([]);
  const [error, setError] = useState({
    _idError: false,
    titleError: false,
    genreError: false,
    dailyRentalRateError: false,
    numberInStockError: false,
    titleErrorMessage: "",
    genreErrorMessage: "",
    dailyRentalRateErrorMessage: "",
    numberInStockErrorMessage: "",
  });

  const schema = {
    _id: Joi.string().label("ID"),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(1)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().required().min(1).max(10).label("Rate"),
  };

  useEffect(() => {
    const fetchData = async () => {
      const genresData = await getGenres();
      setGenre(genresData);

      const movieId = match.params.id;
      if (movieId === "new") return;

      const movie = getMovie(movieId);
      if (!movie) return history.replace("/not-found");

      setData(mapToViewModel(movie));
    };

    fetchData();
  }, []);

  function mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  function validate() {
    const { error } = Joi.validate(data, schema, { abortEarly: false });
    if (!error) return null;

    let anyError = {};

    for (const item of error.details) {
      anyError[`${item.path[0]}Error`] = true;
      anyError[`${item.path[0]}ErrorMessage`] = item.message;
    }

    console.log(anyError);

    return anyError;
  }

  const validateField = (name, value) => {
    const field = { [name]: value };
    const fieldSchema = { [name]: schema[name] };

    const { error } = Joi.validate(field, fieldSchema);
    return error ? error.details[0].message : null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const $error = { ...error };
    const errorMessage = validateField(name, value);

    if (errorMessage) {
      $error[`${name}Error`] = true;
      $error[`${name}ErrorMessage`] = errorMessage;
    } else if ($error.hasOwnProperty(`${name}Error`)) {
      $error[`${name}Error`] = false;
      $error[`${name}ErrorMessage`] = "";
    }

    setData((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
    setError($error);
  };

  function handleGenreSelect(id) {
    setData((prevAccount) => ({
      ...prevAccount,
      genreId: id,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const anyError = validate();
    setError(anyError || {});
    if (anyError) return;

    saveMovie(data);
    history.push("/movies");
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <h1>Movie Form</h1>
      <Box>
        <Input
          name="title"
          label="Title"
          onChange={handleInputChange}
          value={data.title}
          error={error.titleError}
          errorMessage={error.titleErrorMessage}
        />
        <DropDown
          items={genres}
          label="Genre"
          selectedItem={data.genreId}
          error={error.genreError}
          errorMessage={error.genreErrorMessage}
          onChange={handleGenreSelect}
        />

        <Input
          name="numberInStock"
          label="NumberInStock"
          onChange={handleInputChange}
          value={data.numberInStock}
          error={error.numberInStockError}
          errorMessage={error.numberInStockErrorMessage}
        />
        <Input
          name="dailyRentalRate"
          label="Rate"
          onChange={handleInputChange}
          value={data.dailyRentalRate}
          error={error.dailyRentalRateError}
          errorMessage={error.dailyRentalRateErrorMessage}
        />
      </Box>
      <Button type="submit" variant="contained" disabled={validate() !== null}>
        Add Movie
      </Button>
    </form>
  );
}

export default MoviesForm;
