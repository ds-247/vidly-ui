import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DropDown({
  items,
  label,
  textProperty,
  valueProperty,
  onChange,
  selectedItem,
}) {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <FormControl sx={{ mb: 2, mt: 2, width: "80%" }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedItem}
        label={label}
        onChange={handleChange}
      >
        {items.map((item) => (
          <MenuItem key={item[valueProperty]} value={item[valueProperty]}>
            {item[textProperty]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

DropDown.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
