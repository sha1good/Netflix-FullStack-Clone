import { userRequest } from "../../hooks/requestMethods";
import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
  updateListFailure,
  updateListStart,
  updateListSuccess,
} from "./ListActions";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const response = await userRequest.get("/lists");
    dispatch(getListsSuccess(response.data));
  } catch (error) {
    dispatch(getListsFailure());
  }
};

//create
export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await userRequest.post("/lists", list);
    dispatch(createListSuccess(res.data));
  } catch (error) {
    dispatch(createListFailure());
  }
};

//update
export const updateAList = async (id, updatedlist, dispatch) => {
  dispatch(updateListStart());
  try {
    const res = await userRequest.put(`/lists/${id}`, updatedlist);
    console.log(res.data);
    dispatch(updateListSuccess({ _id: id, list: res.data }));
  } catch (error) {
    dispatch(updateListFailure());
  }
};

export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());
  try {
    await userRequest.delete("/lists/" + id);
    dispatch(deleteListSuccess(id));
  } catch (error) {
    dispatch(deleteListFailure());
  }
};
