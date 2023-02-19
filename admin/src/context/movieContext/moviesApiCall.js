import { userRequest } from "../../hooks/requestMethods";
import {
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  deleteMoviesFailure,
  deleteMoviesStart,
  deleteMoviesSuccess,
  createMoviesStart,
  createMoviesFailure,
  createMoviesSuccess,
  updateMovieStart,
  updateMovieSuccess,
  updateMovieFailure,
} from "./MovieActions";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const response = await userRequest.get("/movies");
    dispatch(getMoviesSuccess(response.data));
  } catch (error) {
    dispatch(getMoviesFailure());
  }
};

//create
export const createMovie = async (movie, dispatch) => {
  dispatch(createMoviesStart());
  try {
    const res = await userRequest.post("/movies", movie);
    dispatch(createMoviesSuccess(res.data));
  } catch (error) {
    dispatch(createMoviesFailure());
  }
};

//update
export const updateAMovie = async (id, movie, dispatch) => {
  dispatch(updateMovieStart());
  try {
    const res = await userRequest.put(`/movies/${id}`, movie);
     console.log(res.data)
    dispatch(updateMovieSuccess({ _id: id, movie: res.data }));
  } catch (error) {
    dispatch(updateMovieFailure());
  }
};

export const deleteMovies = async (id, dispatch) => {
  dispatch(deleteMoviesStart());
  try {
    await userRequest.delete("/movies/" + id);
    dispatch(deleteMoviesSuccess(id));
  } catch (error) {
    dispatch(deleteMoviesFailure());
  }
};
