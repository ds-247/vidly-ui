import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../ComponentStyle/imageUpload.css";

const ImageUpload = ({ data, onImageChange }) => {
  // const [imageData, setImageData] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // setImageData(base64String);
        onImageChange(base64String); // Notify the parent component about the image change
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    // setImageData(null);
    onImageChange(null); // Notify the parent component about the image removal
  };

  return (
    <div className="imageUpload-container">
      {data.movieImage ? (
        <div className="inputImage">
          <img
            src={data.movieImage}
            alt="Movie Poster"
            width="200"
            height="200"
          />
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleImageRemove}
            color="error"
          >
            Remove Image
          </Button>
        </div>
      ) : (
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
