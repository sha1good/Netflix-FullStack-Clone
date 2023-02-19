import { Link, useHistory, useLocation } from "react-router-dom";
import "./movie.css";
//import Chart from "../../components/chart/Chart";
//import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useState } from "react";
import storage from "../../firebase";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateAMovie } from "../../context/movieContext/moviesApiCall";

export default function Movie() {
  const location = useLocation();
  const movie = location.movie;
  console.log(movie);
  const { dispatch } = useContext(MovieContext);
  const history = useHistory();

  const [updateMovie, setUpdateMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [filePercentage, setFilePercentage] = useState(0);

  const handleChange = (event) => {
    const value = event.target.value;
    setUpdateMovie({ ...updateMovie, [event.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setFilePercentage(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log("File available at ", url);
            setUpdateMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUploading = (event) => {
    event.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    updateAMovie(movie._id, updateMovie, dispatch);
    history.push("/movies");
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        {filePercentage > 0 &&
            "Uploading Files:" +
              filePercentage +
              "%, click Update button once done!"}
        <Link to="/newmovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src={
                movie?.img ||
                "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              }
              alt=""
              className="productInfoImg"
            />
            <span className="productName">
              {movie?.title || "Super Comedy"}
            </span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">
                {movie?._id || "4666589949"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">
                {movie?.genre || "comedy"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie?.year || 1995}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie?.ageLimit || 18}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              placeholder={movie?.title}
              name="title"
              onChange={handleChange}
            />
            <label>Year</label>
            <input
              type="text"
              placeholder={movie?.year}
              name="year"
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              placeholder={movie?.genre}
              name="genre"
              onChange={handleChange}
            />
            <label>AgeLimit</label>
            <input
              type="text"
              placeholder={movie?.ageLimit}
              name="ageLimit"
              onChange={handleChange}
            />
            <label>Trailer</label>
            <input
              type="file"
              placeholder={movie?.trailer}
              name="trailer"
              onChange={(event) => setTrailer(event.target.files[0])}
            />
            <label>Video</label>
            <input
              type="file"
              placeholder={movie?.video}
              name="video"
              onChange={(event) => setVideo(event.target.files[0])}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={
                  movie?.img ||
                  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                }
                alt=""
                className="productUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                name="img"
                onChange={(event) => setImg(event.target.files[0])}
              />
            </div>
            {uploaded === 3 ? (
              <button className="productButton" onClick={handleUpdate}>
                Update
              </button>
            ) : (
              <button className="productButton" onClick={handleUploading}>
                Uploading
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
