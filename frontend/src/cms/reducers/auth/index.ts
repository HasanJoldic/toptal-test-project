export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const LOG_OUT = "LOG_OUT";
export const RESET_USERNAME = "RESET_USERNAME";

const INITIAL_STATE = {
  isLoggedIn: false,
  username: "",
  uid: "",
  accessToken: "",
  role: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      const { username, uid, accessToken } = action.payload;
      return { 
        ...state, 
        isLoggedIn: true,
        username: username, uid: uid,
        accessToken: accessToken,
        role: action.payload.user.role
      };
    case LOG_OUT:
      return { 
        ...state, 
        isLoggedIn: false,
        username: "", uid: "", accessToken: ""
      };
    case RESET_USERNAME:
      return { ...state, username: action.payload.username };
    default:
      return state;
  }
};