import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

// check how to align text center in the list item
// change colors and can refactor this and extract all the component and left with only listItem

export default function ListGroup({
  textProperty,
  valueProperty,
  items,
  onItemSelect,
  selectedItem,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        border: "1px solid gray",
        borderRadius: "10px",
      }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          {items.map((item) => {
            return (
              <div key={item[valueProperty]}>
                <ListItem>
                  <ListItemButton
                    selected={
                      selectedItem &&
                      selectedItem[valueProperty] === item[valueProperty]
                    }
                    onClick={() => onItemSelect(item)}
                  >
                    <ListItemText primary={item[textProperty]} />
                  </ListItemButton>
                </ListItem>
              </div>
            );
          })}
        </List>
      </nav>
    </Box>
  );
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
