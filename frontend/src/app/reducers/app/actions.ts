import {
  LOAD_START, LOAD_FINISH,
  SET_ERROR_MESSAGE, SET_CRITICAL_ERROR_MESSAGE, SET_SUCCESS_MESSAGE
} from "./index";

export const loadStart = () => ({
  type: LOAD_START
});

export const loadFinish = () => ({
  type: LOAD_FINISH
});

export const setErrorMessage = (errorMessage) => ({
  type: SET_ERROR_MESSAGE,
  payload: { errorMessage }
});

export const setCriticalErrorMessage = (criticalErrorMessage) => ({
  type: SET_CRITICAL_ERROR_MESSAGE,
  payload: { criticalErrorMessage }
});

export const setSuccessMessage = (successMessage) => ({
  type: SET_SUCCESS_MESSAGE,
  payload: { successMessage }
});