import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Icon } from "@material-ui/core";

import Post from "./Post";

import styles from "../styles/posts.module.css";

const Posts = () => {
  const posts = useSelector((store) => store.posts);
  const [search, setSearch] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const searchForm = (
    <div className={`row centered ${styles.searchForm}`}>
      <i className={styles.hash}>#</i>
      <input
        type="text"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <Icon
        onClick={() => {
          setSearch(false);
          setSearchVal("");
        }}>
        close
      </Icon>
    </div>
  );

  const hashSearcher = (hash) => {
    setSearch(true);
    setSearchVal(hash);
  };

  return (
    <div className={`column centered container`}>
      {search ? (
        searchForm
      ) : (
        <button
          className={`row centered ${styles.searchBtn}`}
          onClick={() => setSearch(true)}>
          <Icon>search</Icon> Search by #
        </button>
      )}
      {searchVal
        ? posts
            .filter(
              (post) => post.hashtags && post.hashtags.includes(searchVal)
            )
            .map((post) => <Post post={post} hashSearcher={hashSearcher} />)
        : posts?.map((post) => (
            <Post post={post} hashSearcher={hashSearcher} />
          ))}
    </div>
  );
};

export default Posts;
