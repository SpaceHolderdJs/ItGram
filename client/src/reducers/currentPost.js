const currentPostReducer = (data = null, action) => {
  switch (action.type) {
    case "INIT_CURR_POST":
      return action.payload;
    case "REMOVE_CURR_POST":
      return null;
    default:
      return data;
  }
};

export default currentPostReducer;
