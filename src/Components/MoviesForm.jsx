import React,{useState} from "react";
import Input from './common/Input'
import Joi from 'joi-browser'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function MoviesForm({ match, history }) {
  const [data, setData] = useState({
    title: "",
    genre: "",
    stock: "",
    rate: "",
  });
  const [error, setError] = useState({
    titleError: false,
    passwordError: false,
    rateError: false,
    stockError: false,
    titleErrorMessage: "",
    genreErrorMessage: "",
    rateErrorMessage: "",
    stockErrorMessage: "",
  });

  const schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().regex(/^[A-Za-z]+$/).label("Genre"),
    stock: Joi.number().integer().required().min(1).max(100).label("NumberInStock"),
    rate: Joi.number().required().min(1).max(10).label("Rate"),
  };

  const validate = () => {
    const { error } = Joi.validate(data, schema, { abortEarly: false });
    if (!error) return null;

    let anyError = {};

    for (const item of error.details) {
      anyError[`${item.path[0]}Error`] = true;
      anyError[`${item.path[0]}ErrorMessage`] = item.message;
    }

    return anyError;
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const anyError = validate();

    setError(anyError || {});

    if (anyError) return;

    // Perform further actions, like calling the server
    console.log("Adding new movie ...");
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
        <Input
          name="genre"
          label="Genre"
          type="genre"
          onChange={handleInputChange}
          value={data.genre}
          error={error.genreError}
          errorMessage={error.genreErrorMessage}
        />
        <Input
          name="stock"
          label="NumberInStock"
          onChange={handleInputChange}
          value={data.stock}
          error={error.stockError}
          errorMessage={error.stockErrorMessage}
        />
        <Input
          name="rate"
          label="Rate"
          onChange={handleInputChange}
          value={data.rate}
          error={error.rateError}
          errorMessage={error.rateErrorMessage}
        />
      </Box>
      <Button  type="submit" variant="contained" disabled={validate() !== null}>
        Add Movie
      </Button>
    </form>
  );
}

export default MoviesForm;
