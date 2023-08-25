import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SearchBox({ query, onSearch }) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "80%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        value={query}
        label="Search..."
        variant="outlined"
        onChange={(e) => onSearch(e.target.value)}
      />
    </Box>
  );
}
