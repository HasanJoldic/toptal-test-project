export const LOAD_START = "app/LOAD_START";
export const LOAD_FINISH = "app/LOAD_FINISH";

export const SET_ERROR_MESSAGE = "app/SET_ERROR_MESSAGE";
export const SET_CRITICAL_ERROR_MESSAGE = "app/SET_CRITICAL_ERROR_MESSAGE";
export const SET_SUCCESS_MESSAGE = "app/SET_SUCCESS_MESSAGE";

const INITIAL_STATE = {
  isLoading: false,
  errorMessage: "",
  criticalErrorMessage: "",
  successMessage: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case LOAD_START:
      return { ...state, isLoading: true };
    case LOAD_FINISH:
      return { ...state, isLoading: false };

    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload.errorMessage };
    case SET_CRITICAL_ERROR_MESSAGE:
      return { ...state, criticalErrorMessage: action.payload.criticalErrorMessage };
    case SET_SUCCESS_MESSAGE:
      return { ...state, successMessage: action.payload.successMessage };

    default:
      return state;
  }
};