const toastReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_TOAST":
      return { ...action.payload };

    case "REMOVE_TOAST":
      return null;

    default:
      return state;
  }
};

export default toastReducer;
