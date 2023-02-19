import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../hooks/requestMethods";
import "./featured.scss";

const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomMovieContent = async () => {
      try {
        const response = await userRequest.get(`/movies/random?type=${type}`);
        //console.log(response);
        setContent(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getRandomMovieContent();
  }, [type]);

  console.log(content);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "TVSeries"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(event) => setGenre(event.target.value)}
          >
            <option>Genre</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content?.img} alt="" />

      <div className="info">
        <img src={content?.imgTitle} alt="info" />
        <span className="desc">{content?.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
