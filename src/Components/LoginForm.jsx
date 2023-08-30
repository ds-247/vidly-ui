import React, { useState } from "react";
import Joi from "joi-browser";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Input from "./common/Input";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

function LoginForm() {
  const [account, setAccount] = useState({ username: "", password: "" });
  const [error, setError] = useState({
    usernameError: false,
    passwordError: false,
    usernameErrorMessage: "",
    passwordErrorMessage: "",
  });

  const schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(8).required().label("Password"),
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

    try {
      await auth.login(account.username, account.password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const err = { ...error };
        err.usernameError = true;
        err.usernameErrorMessage = ex.response.data;
        setError(err);
      }
    }
  };

  return (
    <>
      {auth.getCurrentUser() ? (
        <Redirect to="/" />
      ) : (
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h1>Login Form</h1>
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
          </Box>
          <Button
            type="submit"
            variant="contained"
            disabled={validate() !== null}
          >
            LogIn
          </Button>
        </form>
      )}
    </>
  );
}

export default LoginForm;
