import { sendRequest } from "../../api";

import {
  SET_USER, SET_USERS
} from "./index";

import {
  RESET_USERNAME
} from "../auth/index";

import {
 loadStart, loadFinish, setErrorMessage, setCriticalErrorMessage, setSuccessMessage 
} from "../app/actions";

export const getUser = (username) => {
  return async (dispatch, getState) => {
    dispatch(loadStart());
    sendRequest("get", `/api/v1/user/${username}`)
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
      dispatch(setCriticalErrorMessage(err.response.data.message));
      dispatch(setErrorMessage(err.response.data.message));
    })
  };
};

export const postUser = (user) => {
  return async (dispatch, getState) => {
    dispatch(loadStart());
    sendRequest("post", "/api/v1/user", user)
    .then(res => {
      dispatch(loadFinish());
      if (res.status === 200) {
        dispatch(setSuccessMessage("Successfuly created a new user."));
      } else {
        dispatch(setErrorMessage(res.data.message));
      }
    }).catch(err => {
      dispatch(loadFinish());
      dispatch(setCriticalErrorMessage(err.response.data.message));
      dispatch(setErrorMessage(err.response.data.message));
    })
  };
};

export const putUser = (username, user) => {
  return async (dispatch, getState) => {
    dispatch(loadStart());
    sendRequest("put", `/api/v1/user/${username}`, user)
    .then(res => {
      dispatch(loadFinish());
      if (res.status === 200) {
        dispatch(setSuccessMessage("Successfuly updated user info."));
        dispatch({
          type: SET_USER,
          payload: { selectedUser:  res.data.user }
        });
      } else {
        dispatch(setErrorMessage(res.data.message));
      }
    }).catch(err => {
      dispatch(loadFinish());
      dispatch(setCriticalErrorMessage(err.response.data.message));
      dispatch(setErrorMessage(err.response.data.message));
    })
  };
};

export const deleteUser = (username) => {
  return async (dispatch, getState) => {
    dispatch(loadStart());
    sendRequest("delete", `/api/v1/user/${username}`)
    .then(res => {
      dispatch(loadFinish());
      if (res.status === 200) {
        dispatch(setSuccessMessage("Successfuly deleted user."));
      } else {
        dispatch(setErrorMessage(res.data.message));
      }
    }).catch(err => {
      dispatch(loadFinish());
      dispatch(setCriticalErrorMessage(err.response.data.message));
      dispatch(setErrorMessage(err.response.data.message));
    })
  };
};

export const getUsers = () => {
  return async (dispatch, getState) => {
    dispatch(loadStart());
    sendRequest("get", "/api/v1/users")
    .then(res => {
      dispatch(loadFinish());
      if (res.status === 200) {
        dispatch({
          type: SET_USERS,
          payload: { users: res.data }
        });
      } else {
        dispatch(setErrorMessage(res.data.message));
      }
    }).catch(err => {
      dispatch(loadFinish());
      dispatch(setCriticalErrorMessage(err.response.data.message));
      dispatch(setErrorMessage(err.response.data.message));
    })
  };
};