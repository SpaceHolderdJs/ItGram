import { combineReducers } from "redux";

import userReducer from "./user";
import toastReducer from "./toast";
import postReducer from "./posts";
import usersReducer from "./users";
import currentPostReducer from "./currentPost";
import currentProfileReducer from "./currentProfile";

const allReducers = combineReducers({
  user: userReducer,
  toast: toastReducer,
  posts: postReducer,
  users: usersReducer,
  currentPost: currentPostReducer,
  currentProfile: currentProfileReducer,
});

export default allReducers;
