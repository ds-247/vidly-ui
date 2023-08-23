import React from "react";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

function TableHeader(props) {
  const { columns, onSort, sortColumn } = props;

  function raiseSort(property) {
    const column = { ...sortColumn };
    if (column.path === property)
      column.order = column.order === "asc" ? "desc" : "asc";
    else {
      column.path = property;
      column.order = "asc";
    }

    onSort(column);
  }

  function renderSortIcon(column) {
    if (column.path !== sortColumn.path) return null;
    return sortColumn.order === "asc" ? (
      <ArrowDropUpRoundedIcon />
    ) : (
      <ArrowDropDownRoundedIcon />
    );
  }

  return (
    <thead>
      <tr className="clickable">
        {columns.map((column, index) => {
          return (
            column.path && (
              <th
                key={index}
                scope="col"
                onClick={() => raiseSort(column.path)}
              >
                {column.label} {renderSortIcon(column)}
              </th>
            )
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
