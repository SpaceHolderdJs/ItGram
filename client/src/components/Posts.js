import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "./Post";

const Posts = () => {
  const posts = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  return (
    <div className={`column centered container`}>
      {posts ? posts.map((post) => <Post post={post} />) : <h1>No posts</h1>}
    </div>
  );
};

export default Posts;
