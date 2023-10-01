import React, { useEffect, useState } from "react";
import Dialogue from "./common/Dialogue";
import { getGenres, deleteGenre, updateGenre, addGenre } from "../services/genreService";
import Input from "./common/Input";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  Button,
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

const flex = {
  display : "flex",
  alignItems: "center"
}

const btn = {
  height : "40px",
  marginLeft: "20px"
}

function GenresTable() {
  const [genres, setGenres] = useState([]);
  const [newGenre,setNewGenre] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let { data: genreData } = await getGenres();
      setGenres(genreData);
    };

    fetchData();
  }, [genres]);

  const handleChange = (e)=>{
    setNewGenre(e.target.value);
  }
  const handleGenreAdd = async ()=>{
    if(newGenre.trim() !== ""){
      await addGenre(newGenre);
    }
  }

  const handleSave = async (index, genreId, newGenre) => {
    const originalGenres = genres;
    const temp = genres;

    temp[index].name = newGenre;
    setGenres(temp);

    try {
      await updateGenre({ _id: genreId, name: newGenre });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // toast.error("The movie has already been deleted...");
        // console.log("here goes the toast mssg movie is already deleted");

        setGenres(originalGenres);
      }
    }
  };

  const handleDelete = async (genreId) => {
    const orgGeneres = genres;
    const updatedGenres = orgGeneres.filter(($genre) => $genre._id !== genreId);
    setGenres(updatedGenres);

    try {
      await deleteGenre(genreId);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // toast.error("The movie has already been deleted...");
        // console.log("here goes the toast mssg movie is already deleted");

        setGenres(orgGeneres);
      }
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={centerCellStyle}>ID</TableCell>
              <TableCell style={centerCellStyle}>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {genres.map((genre, index) => (
              <TableRow key={genre._id}>
                <TableCell style={centerCellStyle}>{index + 1}</TableCell>
                <TableCell style={centerCellStyle}>{genre.name}</TableCell>
                <TableCell style={centerCellStyle}>
                  <Dialogue
                    title={"New Genre"}
                    text={"Edit Genre"}
                    label={"Genre"}
                    value={genre.name}
                    onSave={(editedName) =>
                      handleSave(index, genre._id, editedName)
                    }
                  />
                </TableCell>
                <TableCell style={centerCellStyle}>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => handleDelete(genre._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={flex}>
        <Input label={"New Genre..."} name={'genre'} value={newGenre} onChange={handleChange} ></Input>
        <Button variant="contained" style={btn} onClick={handleGenreAdd}>Add Genre</Button>
      </div>
    </>
  );
}

export default GenresTable;
