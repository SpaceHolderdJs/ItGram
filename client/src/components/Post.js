import React, { useState, useContext } from "react";
import styles from "../styles/post.module.css";

import { useSelector, useDispatch } from "react-redux";

import User from "./systems/User";

import { Icon } from "@material-ui/core";

import { Context } from "./Application";

const Post = ({ post, hashSearcher, isPrev, isMsg }) => {
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
    hashtags,
  } = post;

  const user = useSelector((store) => store.user);
  const users = useSelector((store) => store.users);

  const dispatch = useDispatch();

  const postOwner = users.find((user) => user.nickname === userNickname);

  const setSharePostModal = useContext(Context)?.setSharePostModal || null;

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

  const date = new Date(postDate);

  const normalizeDate = (d) => (d.toString().length === 2 ? d : "0" + d);

  const [showFormComment, setShowFormComment] = useState(false);
  const [commentTitle, setCommentTitle] = useState("");

  const preview = (
    <div
      className={`${styles.preview}`}
      style={{ background: `url(${image})`, filter: filterStr }}
      onClick={() => dispatch({ type: "INIT_CURR_POST", payload: post })}></div>
  );

  const msgPost = (
    <div
      className={`${styles.prevMsg}`}
      style={{ background: `url(${image})`, filter: filterStr }}>
      <div className={`column centered ${styles.actionWrapper}`}>
        <Icon
          fontSize="large"
          className={styles.icon}
          onClick={() => dispatch({ type: "INIT_CURR_POST", payload: post })}>
          remove_red_eye
        </Icon>
      </div>
    </div>
  );

  const formComment = (
    <div className={`column ${styles.formComment}`}>
      <div className={`row centered ${styles.section}`}>
        <span className={`row ${styles.contentWrapper}`}>
          <div
            className={styles.userAvatar}
            style={{ background: `url(${userAvatar})` }}></div>
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
        <span className={`row ${styles.contentOwnerWrapper}`}>
          <User user={postOwner} />
        </span>
        <span className="row centered">
          {normalizeDate(date.getDate())}.{normalizeDate(date.getMonth())}.
          {date.getFullYear()}
        </span>
      </div>
      <img src={image} alt="post" style={{ filter: filterStr }} />
      <p>{title}</p>
      <div className="row">
        {hashtags?.length > 0 &&
          hashtags.map((hash) => (
            <span onClick={() => hashSearcher(hash)} className={styles.hashs}>
              #{hash}
            </span>
          ))}
      </div>

      <div className={`row centered ${styles.section}`}>
        <span className="row centered">
          <Icon onClick={() => likePost()}>favorite_border</Icon>
          {likes}
        </span>
        <span className="row centered">
          <Icon
            onClick={() =>
              setSharePostModal && setSharePostModal({ show: true, post })
            }>
            share
          </Icon>
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
                <div className={`row centered ${styles.contentCommentWrapper}`}>
                  <div
                    className={styles.userAvatar}
                    style={{
                      background: `url(${comment.userAvatar})`,
                    }}></div>
                  <h3>{comment.userNickname}</h3>
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
  } else if (isMsg) {
    return msgPost;
  } else {
    return card;
  }
};

export default Post;
