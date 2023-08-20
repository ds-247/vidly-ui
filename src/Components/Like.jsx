import { useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

function Like() {
  const [liked, setLike] = useState(false);
  function toggleLike() {
    console.log("like button is clicked");
    setLike(!liked);
  }

  return (
    <div>
      {liked ? (
        <FavoriteRoundedIcon onClick={toggleLike} />
      ) : (
        <FavoriteBorderRoundedIcon onClick={toggleLike} />
      )}
    </div>
  );
}

export default Like;
