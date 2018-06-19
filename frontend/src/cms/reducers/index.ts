import { combineReducers } from "redux";
import auth from "./auth";
import app from "./app";
import meal from "./meal";
import user from "./user";

export default combineReducers({
  auth,
  app,
  meal,
  user
});