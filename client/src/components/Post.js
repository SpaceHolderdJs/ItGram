import React, { useState } from "react";
import styles from "../styles/post.module.css";

import { useSelector, useDispatch } from "react-redux";

import { Icon } from "@material-ui/core";

const Post = ({ post, isPrev }) => {
  const {
    _id,
    image,
    title,
    userNickname,
    userAvatar,
    likes,
    comments,
    postDate,
    filters,
  } = post;

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const filterStr = filters
    ? `blur(${filters.blur}px) hue-rotate(${filters["hue-rotate"]}deg) sepia(${filters.sepia}%)`
    : undefined;

  const addComment = (comment) => {
    fetch("/updatePost", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        postId: _id,
        update: { comments: [...comments, comment] },
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        !data.err
          ? dispatch({ type: "ADD_COMMENT", payload: { id: _id, comment } })
          : alert("error")
      );
  };

  const likePost = () => {
    fetch("/updatePost", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        postId: _id,
        update: { likes: likes + 1 },
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        !data.err
          ? dispatch({ type: "LIKE_POST", payload: { id: _id } })
          : alert("error")
      );
  };
  const getComments = () => {};

  const date = new Date(postDate);

  const normalizeDate = (d) => (d.toString().length === 2 ? d : "0" + d);

  const [showFormComment, setShowFormComment] = useState(false);
  const [commentTitle, setCommentTitle] = useState("");

  const preview = (
    <div
      className={`${styles.preview}`}
      style={{ background: `url(${image})`, filter: filterStr }}></div>
  );

  const formComment = (
    <div className={`column ${styles.formComment}`}>
      <div className={`row centered ${styles.section}`}>
        <span className={`row ${styles.contentWrapper}`}>
          <img src={userAvatar} alt="user" className={`${styles.userAvatar}`} />
        </span>
        <textarea
          type="text"
          value={commentTitle}
          onChange={(e) => setCommentTitle(e.target.value)}
        />
        <button
          onClick={() => {
            addComment({
              title: commentTitle,
              userAvatar: user.avatar,
              userNickname: user.nickname,
            });
            setCommentTitle("");
          }}>
          Public
        </button>
      </div>
    </div>
  );

  const card = (
    <div className={`column ${styles.card}`}>
      <div className={`row centered ${styles.section}`}>
        <span className={`row ${styles.contentWrapper}`}>
          <img src={userAvatar} alt="user" className={`${styles.userAvatar}`} />
          <h3>{userNickname}</h3>
        </span>
        <span className="row centered">
          {normalizeDate(date.getDate())}.{normalizeDate(date.getMonth())}.
          {date.getFullYear()}
        </span>
      </div>
      <img src={image} alt="post" style={{ filter: filterStr }} />
      <p>{title}</p>
      <div className={`row centered ${styles.section}`}>
        <span className="row centered">
          <Icon onClick={() => likePost()}>favorite_border</Icon>
          {likes}
        </span>
        <span className="row centered">
          <Icon onClick={() => setShowFormComment(!showFormComment)}>
            comment
          </Icon>
          {comments.length}
        </span>
      </div>
      {showFormComment && (
        <div className={`column ${styles.commentsWrapper}`}>
          {formComment}
          {comments.length > 0 &&
            comments.map((comment) => (
              <div className={`column ${styles.comment}`}>
                <div className={`row centered ${styles.contentWrapper}`}>
                  <span className={`row ${styles.contentWrapper}`}>
                    <img
                      src={comment.userAvatar}
                      alt="user"
                      className={`${styles.userAvatar}`}
                    />
                    <h3>{comment.userNickname}</h3>
                  </span>
                </div>
                <p>{comment.title}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );

  if (isPrev) {
    return preview;
  } else {
    return card;
  }
};

export default Post;
