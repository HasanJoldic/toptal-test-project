import { sendRequest } from "../../api";

import {
  SET_MEALS, SET_SELECTED_MEAL
} from "./index";

import { SET_USER } from "../user/index";

import {
 loadStart, loadFinish, setErrorMessage, setCriticalErrorMessage, setSuccessMessage 
} from "../app/actions";

export const getMeals = () => {
  return async (dispatch, getState) => {
    if (getState().auth.isLoggedIn) {
      dispatch(loadStart());
      sendRequest("get", `/api/v1/user/${getState().auth.username}/meals`)
      .then(res => {
        dispatch(loadFinish());
        if (res.status === 200) {
          dispatch({
            type: SET_MEALS,
            payload: { meals: res.data.meals }
          });
        } else {
          dispatch(setErrorMessage(res.data.message));
        }
      }).catch(err => {
        dispatch(loadFinish());
        dispatch(setErrorMessage(err.response.data.message));
      });
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
      });
    }
  };
};

export const getMeal = (mealUid) => {
  return async (dispatch, getState) => {
    dispatch(loadStart());
    dispatch({
      type: SET_SELECTED_MEAL, 
      payload: { selectedMeal: null }
    });
    sendRequest("get", `/api/v1/user/${getState().auth.username}/meal/${mealUid}`)
    .then(res => {
      dispatch(loadFinish());
      if (res.status === 200) {
        dispatch(loadFinish());
        dispatch({
          type: SET_SELECTED_MEAL, 
          payload: { selectedMeal: res.data.meal }
        });
      } else {
        dispatch(loadFinish());
        dispatch(setErrorMessage(res));
      }
    }).catch(err => {
      dispatch(loadFinish());
      dispatch(setErrorMessage(err));
    })
  };
};


export const postMeal = (meal) => {
  return async (dispatch, getState) => {
    dispatch(loadStart());
    sendRequest("post", `/api/v1/user/${getState().auth.username}/meal`, meal)
    .then(res => {
      dispatch(loadFinish());
      if (res.status === 200) {
        dispatch(setSuccessMessage("Successfuly added a new meal."));
      } else {
        dispatch(setErrorMessage(res.data.message));
      }
    }).catch(err => {
      dispatch(loadFinish());
      dispatch(setErrorMessage(err.response.data.message));
    })
  };
};

export const putMeal = (mealUid, meal) => {
  return async (dispatch, getState) => {
    dispatch(loadStart());
    sendRequest("put", `/api/v1/user/${getState().auth.username}/meal/${mealUid}`, meal)
    .then(res => {
      dispatch(loadFinish());
      if (res.status === 200) {
        dispatch(setSuccessMessage("Successfuly updated."));
      } else {
        dispatch(setErrorMessage(res.data.message));
      }
    }).catch(err => {
      dispatch(loadFinish());
      dispatch(setErrorMessage(err.response.data.message));
    })
  };
};

export const deleteMeal = (mealUid) => {
  return async (dispatch, getState) => {
    dispatch(loadStart());
    sendRequest("delete", `/api/v1/user/${getState().auth.username}/meal/${mealUid}`)
    .then(res => {
      dispatch(loadFinish());
      if (res.status === 200) {
        dispatch(setSuccessMessage("Successfuly deleted a meal."));

        const meals = getState().meal.meals;
        const mealIndex = meals.findIndex(e => e.uid === mealUid);
        dispatch({
          type: SET_MEALS,
          payload: { meals: [...meals.slice(0, mealIndex), ...meals.slice(mealIndex+1)] }
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
