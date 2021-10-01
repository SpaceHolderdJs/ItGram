import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Icon } from "@material-ui/core";

import styles from "../../styles/emoji.module.css";

const Emoji = ({ sendMessage, currentChat }) => {
  const user = useSelector((store) => store.user);

  const [tab, setTab] = useState("gifs");

  const [gifsArray, setGifsArray] = useState([]);
  const [sticksArray, setSticksArray] = useState([]);

  const key = "lEvYbXlyviIwbqeJQAT2NzLLrxgzKxeS";

  const getGifs = () => {
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${key}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGifsArray(data.data);
      });
  };

  const getSticks = () => {
    fetch(`https://api.giphy.com/v1/stickers/trending?api_key=${key}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSticksArray(data.data);
      });
  };

  useEffect(() => {
    getGifs();
    getSticks();
  }, []);

  const sticksTab = (
    <div className={`row ${styles.tab}`}>
      {sticksArray.length > 0 &&
        sticksArray.map((stick) => (
          <img
            onClick={() =>
              sendMessage({
                chatId: currentChat._id,
                msg: {
                  authorIndx: currentChat.members.indexOf(
                    currentChat.members.find(
                      (m) => m.nickname === user.nickname
                    )
                  ),
                  content: stick.images.fixed_width_small.url,
                  date: +new Date(),
                },
              })
            }
            src={stick.images.fixed_width_small.url}
            alt="stick"
            className={styles.gif}
          />
        ))}
    </div>
  );

  const gifsTab = (
    <div className={`row ${styles.tab}`}>
      {gifsArray.length > 0 &&
        gifsArray.map((gif) => (
          <img
            onClick={() =>
              sendMessage({
                chatId: currentChat._id,
                msg: {
                  authorIndx: currentChat.members.indexOf(
                    currentChat.members.find(
                      (m) => m.nickname === user.nickname
                    )
                  ),
                  content: gif.images.fixed_width_small.url,
                  date: +new Date(),
                },
              })
            }
            src={gif.images.fixed_width_small.url}
            alt="gif"
            className={styles.gif}
          />
        ))}
    </div>
  );

  return (
    <div className={`column ${styles.emoji}`}>
      <div className={`column ${styles.emojiHeader}`}>
        <div className={`row ${styles.block}`}>
          <button onClick={() => setTab("gifs")}>GIFS</button>
          <button onClick={() => setTab("sticks")}>STICKERS</button>
        </div>
        <div className={`row centered ${styles.block}`}>
          <Icon>search</Icon>
          <input type="text" />
        </div>
      </div>
      {tab === "gifs" && gifsTab}
      {tab === "sticks" && sticksTab}
    </div>
  );
};

export default Emoji;
