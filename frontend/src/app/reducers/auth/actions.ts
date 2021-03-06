import {
  AUTH_SUCCESS, LOG_OUT
} from "./index";

import {
  SET_USER
} from "../user/index";

import { sendRequest } from "../../api";

import {
 loadStart, loadFinish, setErrorMessage, setCriticalErrorMessage, setSuccessMessage 
} from "../app/actions";

export const signUp = (username, password) => {
  return async (dispatch, getState) => {
    dispatch(loadStart());
    sendRequest("post", "/api/v1/auth/register", { username, password})
    .then(res => {
      dispatch(loadFinish());
      if (res.status === 200) {
        dispatch({
          type: AUTH_SUCCESS,
          payload: res.data
        });
        dispatch({
          type: SET_USER,
          payload: { selectedUser: res.data.user }
        });
        dispatch(setSuccessMessage("Sign up was successful."));
      } else {
        dispatch(setErrorMessage("Sign up was not successful. Please check input again."));
      }
    }).catch(err => {
      dispatch(loadFinish());
      dispatch(setCriticalErrorMessage("Login was not successful. Please check input again."));
      dispatch(setErrorMessage("Login was not successful. Please check input again."));
    })
  };
};

export const logIn = (username, password) => {
  return async (dispatch, getState) => {
    dispatch(loadStart());
    sendRequest("post", "/api/v1/auth/login", { username, password})
    .then(res => {
      dispatch(loadFinish());
      if (res.status === 200) {
        dispatch({
          type: AUTH_SUCCESS,
          payload: res.data
        });
        dispatch({
          type: SET_USER,
          payload: { selectedUser: res.data.user }
        });
        dispatch(setSuccessMessage("Login was successful."));
      } else {
        dispatch(setErrorMessage("Login was not successful. Please check input again."));
      }
    }).catch(err => {
      dispatch(loadFinish());
      dispatch(setCriticalErrorMessage("Login was not successful. Please check input again."));
      dispatch(setErrorMessage("Login was not successful. Please check input again."));
    })
  };
};

export const logOut = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LOG_OUT });
    dispatch(setSuccessMessage("Log out was successful."));
  }
};