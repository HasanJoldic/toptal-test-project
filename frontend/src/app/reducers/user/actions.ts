import { sendRequest } from "../../api";

import {
  SET_USER
} from "./index";

import {
  RESET_USERNAME
} from "../auth/index";

import {
 loadStart, loadFinish, setErrorMessage, setCriticalErrorMessage, setSuccessMessage 
} from "../app/actions";

export const getUser = () => {
  return async (dispatch, getState) => {
    dispatch(loadStart());
    sendRequest("get", `/api/v1/user/${getState().auth.username}`)
    .then(res => {
      dispatch(loadFinish());
      if (res.status === 200) {
        dispatch({
          type: SET_USER,
          payload: { selectedUser: res.data.user }
        });
      } else {
        dispatch(setErrorMessage(res.data.message));
      }
    }).catch(err => {
      dispatch(loadFinish());
      dispatch(setErrorMessage(err.response.data.message));
    })
  };
};

export const putUser = (user) => {
  return async (dispatch, getState) => {
    dispatch(loadStart());
    sendRequest("put", `/api/v1/user/${getState().auth.username}`, user)
    .then(res => {
      dispatch(loadFinish());
      if (res.status === 200) {
        dispatch(setSuccessMessage("Successfuly updated user info."));
        dispatch({
          type: SET_USER,
          payload: { selectedUser:  res.data.user }
        });
        dispatch({
          type: RESET_USERNAME,
          payload: { username: res.data.user.username }
        })

      } else {
        dispatch(setErrorMessage(res.data.message));
      }
    }).catch(err => {
      dispatch(loadFinish());
      dispatch(setErrorMessage(err.response.data.message));
    })
  };
};

export const deleteUser = () => {
  return async (dispatch, getState) => {
    dispatch(loadStart());
    sendRequest("delete", `/api/v1/user/${getState().auth.username}`)
    .then(res => {
      dispatch(loadFinish());
      if (res.status === 200) {
        dispatch(setSuccessMessage("Successfuly deleted user."));
      } else {
        dispatch(setErrorMessage(res.data.message));
      }
    }).catch(err => {
      dispatch(loadFinish());
      dispatch(setErrorMessage(err.response.data.message));
    })
  };
};
