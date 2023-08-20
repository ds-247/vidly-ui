import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

function Like(props) {
  const { liked, onClick: toggleLike } = props;

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
