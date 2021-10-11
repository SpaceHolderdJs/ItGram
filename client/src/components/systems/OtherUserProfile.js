import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Icon } from "@material-ui/core";

import Post from "../Post";
import Git from "./Git";

import styles from "../../styles/otherUserProfile.module.css";

const OtherUserProfile = () => {
  const currentProfile = useSelector((store) => store.currentProfile);
  const posts = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  const [tab, setTab] = useState("prev");
  const [showGit, setShowGit] = useState(false);

  const userPosts = posts.filter(
    (post) => post.userNickname === currentProfile.nickname
  );

  const { avatar, name, surname, nickname, gitNickname } = currentProfile;
  console.log("!!!", gitNickname, currentProfile);

  if (showGit)
    return <Git onClose={() => setShowGit(false)} nickname={gitNickname} />;

  return (
    <div className={`row centered ${styles.wrapper}`}>
      <div className={`row centered ${styles.userInfo}`}>
        {avatar ? (
          <div
            className={styles.avatar}
            style={{ background: `url(${avatar})` }}></div>
        ) : (
          <Icon className={styles.person}>person</Icon>
        )}
        <div className="column centered">
          <h2>
            {name} {surname}
          </h2>
          <span>{nickname}</span>

          <div className="row">
            {currentProfile.gitNickname &&
              currentProfile.stacks &&
              currentProfile.stacks.map((stack) => (
                <div
                  className={styles.langIco}
                  style={{
                    background: `url(/langs/${stack}.png)`,
                  }}></div>
              ))}
          </div>

          {gitNickname && (
            <button onClick={() => setShowGit(true)}>View git</button>
          )}
        </div>
      </div>
      <div className={`column ${styles.postsWrapper}`}>
        <div className={`row centered ${styles.header}`}>
          <button onClick={() => setTab("prev")} className="row centered">
            <Icon>apps</Icon>
          </button>
          <button onClick={() => setTab("full")} className="row centered">
            <Icon>call_to_action</Icon>
          </button>
        </div>
        <div className={` centered ${tab === "prev" ? "row" : "column"}`}>
          {userPosts?.length > 0 &&
            userPosts.map((post) =>
              tab === "prev" ? (
                <div
                  style={{ background: `url(${post.image})` }}
                  className={`row ${styles.prev}`}
                  onClick={() =>
                    dispatch({ type: "INIT_CURR_POST", payload: post })
                  }></div>
              ) : (
                <Post post={post} />
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfile;
