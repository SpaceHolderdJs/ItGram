import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Post from "../Post";

import { Icon } from "@material-ui/core";

import styles from "../../styles/currentPost.module.css";

const CurrentPost = () => {
  const currentPost = useSelector((store) => store.currentPost);
  const dispatch = useDispatch();

  return (
    <div className={`column centered ${styles.currentPostWrapper}`}>
      <div className={`row ${styles.currentPostHeader}`}>
        <Icon
          className={styles.icon}
          onClick={() => dispatch({ type: "REMOVE_CURR_POST" })}
          fontSize="large">
          arrow_back
        </Icon>
      </div>
      {currentPost && <Post post={currentPost} />}
    </div>
  );
};

export default CurrentPost;
