import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../hooks/requestMethods";
import "./listItem.scss";
import { Link} from "react-router-dom";

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  // const trailer =
  //   "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await userRequest.get("/movies/find/" + item);
        setMovie(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [item]);
  return (
    <Link to={{ pathname: "/watch", movie: movie}}>
    <div
      className="listItem"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
    >
      <img
        src={movie?.img}
        alt="imgProfile"
      />
      {isHovered && (
        <>
          <video src={movie?.trailer} autoPlay={true} loop controls />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownAltOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>1hr 14mins</span>
              <span className="limit">+{movie?.ageLimit}</span>
              <span>{movie?.year}</span>
            </div>
            <div className="desc">
              {movie?.desc}
            </div>
            <div className="genre">{movie?.genre}</div>
          </div>
        </>
      )}
    </div>
    </Link>
  );
};

export default ListItem;
