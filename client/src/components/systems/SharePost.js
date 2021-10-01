import React, { useState, useEffect, useContext } from "react";

import { useSelector } from "react-redux";

import { Context } from "../Application";

import User from "../systems/User";

import { Icon } from "@material-ui/core";

import styles from "../../styles/sharePost.module.css";

const SharePost = () => {
  const users = useSelector((store) => store.users);
  const user = useSelector((store) => store.user);

  const { sharePostModal, setSharePostModal, sharePost } = useContext(Context);

  const [chats, setChats] = useState();

  useEffect(() => {
    fetch("/getChats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userNickName: user.nickname,
      }),
    })
      .then((response) => response.json())
      .then((data) => setChats(data.chats));
  }, []);

  return (
    <div className={`column ${styles.background} centered `}>
      <div className={`column ${styles.usersWrapper} container`}>
        <Icon
          className={styles.icon}
          onClick={() => setSharePostModal({ show: false })}>
          close
        </Icon>
        {chats?.map((chat) => (
          <div
            className={styles.userWrapper}
            onClick={() => sharePost(chat, sharePostModal.post)}>
            <User
              user={chat.members.find(
                (member) => member.nickname !== user.nickname
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharePost;
