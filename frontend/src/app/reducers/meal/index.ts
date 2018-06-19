export const SET_MEALS = "meal/SET_MEALS";
export const SET_SELECTED_MEAL = "meal/SET_SELECTED_MEAL";

const INITIAL_STATE = {
  meals: [],
  selectedMeal: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SET_MEALS:
      return { ...state, meals: action.payload.meals };
    case SET_SELECTED_MEAL:
      return { ...state, selectedMeal: action.payload.selectedMeal };

    default:
      return state;
  }
};