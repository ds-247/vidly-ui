import React, { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const centerCellStyle = {
  textAlign: "center",
};

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let { data: userData } = await getUsers();
      setUsers(userData);
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={centerCellStyle}>ID</TableCell>
            <TableCell style={centerCellStyle}>Name</TableCell>
            <TableCell style={centerCellStyle}>Email</TableCell>
            <TableCell style={centerCellStyle}>Prime</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell style={centerCellStyle}>{index + 1}</TableCell>
              <TableCell style={centerCellStyle}>{user.name}</TableCell>
              <TableCell style={centerCellStyle}>{user.email}</TableCell>
              <TableCell style={centerCellStyle}>{user.isPrime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Users;
