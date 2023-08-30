import React, { useState } from "react";
import Joi from "joi-browser";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Input from "./common/Input";
import { register } from "../services/userService";
import auth from "../services/authService";

function RegisterForm() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState({
    usernameError: false,
    passwordError: false,
    nameError: false,
    usernameErrorMessage: "",
    passwordErrorMessage: "",
    nameErrorMessage: "",
  });

  const schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(8).required().label("Password"),
    name: Joi.string().min(5).required().label("Name"),
  };

  const validate = () => {
    const { error } = Joi.validate(account, schema, { abortEarly: false });
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

    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
    setError($error);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const anyError = validate();

    setError(anyError || {});

    if (anyError) return;

    // Perform further actions, like calling the server

    try {
      const response = await register(account);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      // localStorage.setItem('token',response.headers['x-auth-token']);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const err = error;
        err.usernameError = true;
        err.usernameErrorMessage = ex.response.data;
        setError(err);
      }
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <h1>Registration Form</h1>
      <Box>
        <Input
          name="username"
          label="UserName"
          onChange={handleInputChange}
          value={account.username}
          error={error.usernameError}
          errorMessage={error.usernameErrorMessage}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          onChange={handleInputChange}
          value={account.password}
          error={error.passwordError}
          errorMessage={error.passwordErrorMessage}
        />
        <Input
          name="name"
          label="Name"
          onChange={handleInputChange}
          value={account.name}
          error={error.name}
          errorMessage={error.nameErrorMessage}
        />
      </Box>
      <Button type="submit" variant="contained" disabled={validate() !== null}>
        Register
      </Button>
    </form>
  );
}

export default RegisterForm;
