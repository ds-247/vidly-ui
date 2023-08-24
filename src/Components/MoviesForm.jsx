import React from "react";
import Button from "@mui/material/Button";

function MoviesForm({ match, history }) {
  return (
    <>
      <h1>MoviesForm {match.params.id}</h1>
      <Button variant="contained" onClick={history.goBack}>
        SAVE
      </Button>
    </>
  );
}

export default MoviesForm;
