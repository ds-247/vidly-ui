import React from "react";
import _ from "lodash";

function TableBody(props) {
  const { data, columns } = props;

  function renderCell(item, column) {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  }

  function uniqueKey(item, col) {
    return item._id + (col.path || col.key);
  }

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={uniqueKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
