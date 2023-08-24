import TextField from "@mui/material/TextField";

function Input({ label, name, onChange, value, type, error, errorMessage }) {
  return (
    <TextField
      autoComplete=""
      error={error}
      helperText={error && errorMessage}
      type={type}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      sx={{ mb: 2, mt: 4, width: "80%" }}
    />
  );
}

export default Input;

Input.defaultProps = {
  type: "text",
};
