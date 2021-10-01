import React, { useState, useContext, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@material-ui/core";

import { Context } from "./Application";

import Post from "./Post";
import ImageUpload from "./systems/ImageUpload";

import styles from "../styles/userPosts.module.css";

const UserPosts = () => {
  const { getPosts } = useContext(Context);

  const posts = useSelector((store) => store.posts);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [tab, setTab] = useState("posts");
  const [postImage, setPostImage] = useState();
  const [postTitle, setPostTitle] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const [filtersValues, setFiltersValues] = useState({
    blur: 0,
    "hue-rotate": 0,
    sepia: 0,
  });

  const createPost = (data) => {
    fetch(`/createPost`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      method: "POST",
    })
      .then((response) => response.json())
      .then((r) => (r.err ? alert("Error") : getPosts()));
  };

  const header = (
    <div className={`row centered ${styles.header}`}>
      <div
        onClick={() => setTab("posts")}
        className={`row centered ${styles.iconsWrapper} ${
          tab === "posts" && styles.active
        }`}>
        <Icon fontSize="large">apps</Icon>
      </div>
      <div
        onClick={() => setTab("create")}
        className={`row centered ${styles.iconsWrapper} ${
          tab === "create" && styles.active
        }`}>
        <Icon fontSize="large">add_circle</Icon>
      </div>
    </div>
  );

  const postsFragment = (
    <div className={`row ${styles.previewPostsWrapper}`}>
      {posts?.filter((post) => post.userNickname === user.nickname).length >
      0 ? (
        posts
          .filter((post) => post.userNickname === user.nickname)
          .map((post) => <Post post={post} isPrev={true} />)
      ) : (
        <h1>No posts</h1>
      )}
    </div>
  );

  const createPostFragment = (
    <div className={`column centered`}>
      {!postImage ? (
        <ImageUpload title={"Upload post image"} callBack={setPostImage} />
      ) : (
        <>
          <img
            src={postImage}
            alt="img"
            className={styles.preview}
            style={{
              filter: `blur(${filtersValues.blur}px) hue-rotate(${
                filtersValues["hue-rotate"] * 10
              }deg) sepia(${filtersValues.sepia * 10}%) `,
            }}
          />
          <div className={`column centered ${styles.filtersWrapper}`}>
            {showFilters && (
              <Icon fontSize="medium" onClick={() => setShowFilters(false)}>
                close
              </Icon>
            )}
            {!showFilters ? (
              <Icon fontSize="medium" onClick={() => setShowFilters(true)}>
                tune
              </Icon>
            ) : (
              Object.keys(filtersValues).map((filter) => (
                <div className={`row centered ${styles.filteInpWrapper}`}>
                  <span>{filter}</span>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    value={filtersValues[filter]}
                    onChange={(e) =>
                      setFiltersValues({
                        ...filtersValues,
                        [filter]: e.target.value,
                      })
                    }
                  />
                </div>
              ))
            )}
          </div>
        </>
      )}
      <span>Your text below</span>
      <textarea
        cols="30"
        rows="10"
        placeholder="Description..."
        onChange={(e) => setPostTitle(e.target.value)}></textarea>
      <button
        onClick={() => {
          createPost({
            userNickname: user.nickname,
            userAvatar: user.avatar,
            title: postTitle,
            image: postImage,
            filters: filtersValues,
          });
          setPostImage();
          setPostTitle();
        }}>
        Public
      </button>
    </div>
  );

  return (
    <div className={`column ${styles.userPosts} container`}>
      {header}
      {tab === "create" ? createPostFragment : postsFragment}
    </div>
  );
};

export default UserPosts;
