import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { createMovie } from "../../context/movieContext/moviesApiCall";
import storage from "../../firebase";
import "./newMovie.css";

export default function NewProduct() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [filePercentage, setFilePercentage] = useState(0);

  const { dispatch } = useContext(MovieContext);
  const history = useHistory();

  const handleChange = (event) => {
    const value = event.target.value;
    setMovie({ ...movie, [event.target.name]: value });
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
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };
  console.log(movie);

  const handleCreate = (event) => {
    event.preventDefault();
    createMovie(movie, dispatch);
    history.push("/movies");
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <span>
        {filePercentage > 0 &&
          "Uploading Files:" +
            filePercentage +
            "%, Once done, click create button"}
      </span>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(event) => setImg(event.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(event) => setImgTitle(event.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(event) => setImgSm(event.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="duration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Age Limit</label>
          <input
            type="text"
            placeholder="limit"
            name="ageLimit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>isSeries</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            id="trailer"
            name="trailer"
            onChange={(event) => setTrailer(event.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            id="video"
            name="video"
            onChange={(event) => setVideo(event.target.files[0])}
          />
        </div>
        {uploaded === 5 ? (
          <button className="addProductButton" onClick={handleCreate}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
