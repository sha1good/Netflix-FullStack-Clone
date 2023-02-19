import { publicRequest } from "../../hooks/requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    if(res.data.isAdmin){
      dispatch(loginSuccess(res.data))
    }else{
      dispatch(loginFailure());
    }
  } catch (error) {
    dispatch(loginFailure());
  }
};
