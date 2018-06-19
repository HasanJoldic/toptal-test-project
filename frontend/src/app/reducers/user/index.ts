export const SET_USER = "user/SET_USER";

const INITIAL_STATE = {
  selectedUser: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, selectedUser: action.payload.selectedUser };
    default:
      return state;
  }
};