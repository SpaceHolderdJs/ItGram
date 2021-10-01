import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Icon } from "@material-ui/core";

import User from "./systems/User";

import styles from "../styles/chat.module.css";

import Emoji from "./systems/Emoji";

const Chats = () => {
  const user = useSelector((store) => store.user);
  const users = useSelector((store) => store.users);
  const optimizedUsers = users.filter((u) => u.nickname !== user.nickname);

  const [chats, setChats] = useState([]);

  const [createChat, setCreateChat] = useState(false);

  const [searchUserValue, setSearchUserValue] = useState("");

  const [currentChat, setCurrentChat] = useState(null);

  const [msgText, setMsgText] = useState("");

  const sendMessage = (data) => {
    console.log(data.msg);
    setCurrentChat({
      ...currentChat,
      messages: [...currentChat.messages, { ...data.msg, processing: true }],
    });

    fetch("/sendMsg", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    })
      .then((response) => response.json())
      .then((r) =>
        !r.err
          ? setCurrentChat({
              ...currentChat,
              messages: [...currentChat.messages, data.msg],
            })
          : alert("Error")
      );
  };

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

  const createChatFunction = (members) => {
    if (
      chats.find((chat) =>
        members.every((member) =>
          chat.members.find((m) => m.nickname === member.nickname)
        )
      )
    )
      return alert("Chat is already exists");
    fetch("/createChat", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ members: [...members] }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.err ? alert(data.err) : setChats([...chats, data.chat]);
      });
  };

  const createChatFragment = (
    <div className={`column ${styles.createChat}`}>
      <Icon onClick={() => setCreateChat(false)} className={styles.closeIcon}>
        close
      </Icon>
      <input
        type="text"
        value={searchUserValue}
        onChange={(e) => setSearchUserValue(e.target.value)}
      />
      {searchUserValue
        ? optimizedUsers
            .filter((u) => u.nickname.includes(searchUserValue))
            .map((u) => (
              <div
                onClick={() => createChatFunction([user, u])}
                className={styles.userWrapper}>
                <User user={u} />
              </div>
            ))
        : optimizedUsers.map((u) => (
            <div
              onClick={() => createChatFunction([user, u])}
              className={styles.userWrapper}>
              <User user={u} />
            </div>
          ))}
    </div>
  );

  const sideNav = (
    <div className={`column ${styles.sideNav}`}>
      <button
        className={`row centered ${styles.createChatButton}`}
        onClick={() => {
          setCreateChat(true);
          setCurrentChat(null);
        }}>
        <Icon>add_circle</Icon> <span>Create chat</span>
      </button>
      {chats.length > 0 ? (
        chats.map((chat) => {
          const member = chat.members.find(
            (member) => member.nickname !== user.nickname
          );

          return (
            <div
              className={styles.userWrapper}
              onClick={() => {
                setCurrentChat(chat);
                setCreateChat(false);
              }}>
              <User user={member} />
            </div>
          );
        })
      ) : (
        <h1>No chats yet</h1>
      )}
    </div>
  );

  const chatFragment = (
    <div className={`column ${styles.chatFragment}`}>
      <div className={`row ${styles.chatFragmentHeader}`}>
        {currentChat?.members
          .filter((m) => m.nickname !== user.nickname)
          .map((m) => (
            <User user={m} />
          ))}
        <Icon onClick={() => setCurrentChat(null)}>close</Icon>
      </div>
      <div className={`column ${styles.msgBox}`}>
        {currentChat?.messages.map((msg) => {
          console.log(msg);
          const date = new Date(msg.date);

          let h = date.getHours().toString();
          let m = date.getMinutes().toString();

          h = h.length > 1 ? h : "0" + h;
          m = m.length > 1 ? m : "0" + m;

          if (msg.content) {
            return (
              <div
                className={`column ${styles.message} ${
                  currentChat?.members[msg.authorIndx].nickname ===
                  user.nickname
                    ? styles.msgRight
                    : styles.msgLeft
                } ${msg.processing && styles.processing}`}>
                <img src={msg.content} alt="img" />
                <i className={styles.date}>
                  {h}:{m}
                </i>
              </div>
            );
          } else
            return (
              <div
                className={`column ${styles.message} ${
                  currentChat?.members[msg.authorIndx].nickname ===
                  user.nickname
                    ? styles.msgRight
                    : styles.msgLeft
                } ${msg.processing && styles.processing}`}>
                <div className={`row centered`}>
                  <img
                    src={currentChat?.members[msg.authorIndx].avatar}
                    alt="user"
                    className={styles.msgAvatar}
                  />
                  <span>{msg.text}</span>
                </div>
                <i className={styles.date}>
                  {date.getHours()}:{date.getMinutes()}
                </i>
              </div>
            );
        })}
      </div>
      <div className={`row ${styles.chatFragmentFooter}`}>
        <textarea
          type="text"
          value={msgText}
          onChange={(e) => setMsgText(e.target.value)}
          placeholder="Message"
        />
        <button
          onClick={() => {
            sendMessage({
              chatId: currentChat._id,
              msg: {
                authorIndx: currentChat.members.indexOf(
                  currentChat.members.find((m) => m.nickname === user.nickname)
                ),
                text: msgText,
                date: +new Date(),
              },
            });
            setMsgText("");
          }}>
          Send
        </button>
      </div>
    </div>
  );

  return (
    <div className={`row ${styles.chat} container`}>
      {sideNav}
      <div className={`row ${styles.main}`}>
        {createChat && createChatFragment}
        {currentChat && chatFragment}
        {currentChat && (
          <Emoji sendMessage={sendMessage} currentChat={currentChat} />
        )}
      </div>
    </div>
  );
};

export default Chats;
