import { combineReducers } from "redux";

import userReducer from "./user";
import toastReducer from "./toast";
import postReducer from "./posts";
import usersReducer from "./users";

const allReducers = combineReducers({
  user: userReducer,
  toast: toastReducer,
  posts: postReducer,
  users: usersReducer,
});

export default allReducers;
