const postReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_POSTS":
      return [...action.payload];
    case "ADD_COMMENT":
      const post = state.find((post) => post._id === action.payload.id);
      post.comments.push(action.payload.comment);
      return [
        ...state.filter((post) => post._id !== action.payload.id),
        post,
      ].sort((p1, p2) => p1.postDate - p2.postDate);

    case "LIKE_POST":
      const p = state.find((post) => post._id === action.payload.id);
      p.likes += 1;
      return [
        ...state.filter((post) => post._id !== action.payload.id),
        p,
      ].sort((p1, p2) => p1.postDate - p2.postDate);

    default:
      return state;
  }
};

export default postReducer;
