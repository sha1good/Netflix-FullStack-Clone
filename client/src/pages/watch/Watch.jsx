import "./watch.scss";
import { ArrowBackOutlined } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Watch = () => {
  const location = useLocation();
  console.log(location);
  const { movie } = location;

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        src={movie?.video}
        className="video"
        progress={true}
        autoPlay={true}
        controls
        loop
      />
    </div>
  );
};

export default Watch;
