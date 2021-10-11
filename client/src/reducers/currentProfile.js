const currentProfileReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_CURR_PROFILE":
      return action.payload;

    case "REMOVE_CURR_PROFILE":
      return null;

    default:
      return state;
  }
};

export default currentProfileReducer;
