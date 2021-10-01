const userReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_USER":
      return { ...action.payload };

    case "REMOVE_USER":
      return null;

    case "UPDATE_USER":
      // if (action.payload) {
      //   fetch("/updateUser", {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       _id: state._id,
      //       update: { ...action.payload },
      //     }),
      //     method: "PATCH",
      //   })
      //     .then((response) => response.json())
      //     .then((r) => {
      //       console.log("!!!", r.user);
      //       return r.err ? { ...state, name: "err" } : r.user;
      //     });
      // } else return state;
      break;

    default:
      return state;
  }
};

export default userReducer;
