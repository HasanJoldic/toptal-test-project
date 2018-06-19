export const SET_USER = "user/SET_USER";
export const SET_USERS = "user/SET_USERS";

const INITIAL_STATE = {
  selectedUser: null,
  users: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, selectedUser: action.payload.selectedUser };
    case SET_USERS:
      return { ...state, users: action.payload.users };
    default:
      return state;
  }
};