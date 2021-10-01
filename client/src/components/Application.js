import React, { useEffect, useState, createContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Icon from "@material-ui/core/Icon";

import styles from "../styles/application.module.css";

import Profile from "./Profile";
import Posts from "./Posts";
import Chats from "./Chats";
import CurrentPost from "./systems/CurrentPost";
import SharePost from "./systems/SharePost";

export const Context = createContext();

const Application = () => {
  const user = useSelector((store) => store.user);
  const currPost = useSelector((store) => store.currentPost);

  const dispatch = useDispatch();

  const getPosts = useCallback(() => {
    fetch("/posts", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: "INIT_POSTS", payload: data.posts }));
  }, []);

  const getAllUsers = () => {
    fetch("/users")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "INIT_USERS", payload: data.users }));
  };

  const updateUser = useCallback((update) => {
    fetch("/updateUser", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: user._id,
        update: { ...update },
      }),
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((r) => {
        console.log("!!!", r);
        dispatch({ type: "INIT_USER", payload: { ...r.user } });
      });
  }, []);

  const sharePost = (chat, post) => {
    fetch("/sendMsg", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: chat._id,
        msg: {
          authorIndx: chat.members.indexOf(
            chat.members.find((m) => m.nickname === user.nickname)
          ),
          text: "Shared post below :",
          post,
          date: +new Date(),
        },
      }),
    })
      .then((response) => response.json())
      .then((r) => (!r.err ? alert("Sended") : alert("Error")));
  };

  useEffect(() => {
    getPosts();
    getAllUsers();
  }, []);

  const [tab, setTab] = useState("profile");
  const [sharePostModal, setSharePostModal] = useState({
    show: false,
    post: null,
  });

  if (!user) return <h1>Login to view profile</h1>;

  if (currPost) return <CurrentPost />;

  return (
    <div className={`column ${styles.application}`}>
      <Context.Provider
        value={{
          updateUser,
          getPosts,
          sharePostModal,
          setSharePostModal,
          sharePost,
        }}>
        {tab === "profile" && <Profile />}
        {tab === "posts" && <Posts />}
        {tab === "chat" && <Chats />}
        {sharePostModal.show && <SharePost />}
      </Context.Provider>
      <div className={`row centered ${styles.nav}`}>
        <div className={`row centered ${tab === "chat" && styles.active}`}>
          <Icon fontSize="large" onClick={() => setTab("chat")}>
            chat
          </Icon>
        </div>
        <div className={`row centered ${tab === "posts" && styles.active}`}>
          <Icon fontSize="large" onClick={() => setTab("posts")}>
            burst_mode
          </Icon>
        </div>
        <div className={`row centered ${tab === "profile" && styles.active}`}>
          <Icon fontSize="large" onClick={() => setTab("profile")}>
            account_circle
          </Icon>
        </div>
      </div>
    </div>
  );
};

export default Application;
