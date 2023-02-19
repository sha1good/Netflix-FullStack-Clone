import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createList } from "../../context/listContext/listApiCall";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import {
  getMovies,
} from "../../context/movieContext/moviesApiCall";

import "./newList.css";

export default function NewProduct() {
  const [list, setList] = useState(null);

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  const history = useHistory();

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (event) => {
    const value = event.target.value;
    setList({ ...list, [event.target.name]: value });
  };

  const handleSelect = (event) => {
    // console.log(event.target.selectedOptions);
    let value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    //console.log(value);
    setList({ ...list, [event.target.name]: value });
  };

  const handleCreate = (event) => {
    event.preventDefault();
    createList(list, dispatch);
    history.push("/lists");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
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
            <label>Type</label>
            <select name="type" id="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movies">Movies</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              name="content"
              multiple
              style={{ height: "300px" }}
              onChange={handleSelect}
            >
              {movies.map((movie) => (
                <option value={movie._id} key={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={handleCreate}>
          Create
        </button>
      </form>
    </div>
  );
}
