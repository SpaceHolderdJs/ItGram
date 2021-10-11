import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserPosts from "./UserPosts";

import Icon from "@material-ui/core/Icon";

import styles from "../styles/profile.module.css";

import ImageUpload from "./systems/ImageUpload";

import { Context } from "./Application";

import Git from "./systems/Git";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const { updateUser, getPosts } = useContext(Context);

  const [changeAvatar, setChangeAvatar] = useState(false);

  const [tab, setTab] = useState("profile");

  const [gitNick, setGitNick] = useState();

  const avatarUpdate = (avatar) => {
    updateUser({ avatar });
  };

  const closeGit = () => {
    setTab("profile");
  };

  if (tab === "profile") {
    return (
      <div className={`row centered ${styles.profile} container`}>
        <div className={`column ${styles.userInfo}`}>
          <div className="row centered">
            <div className={`column centered`}>
              {!user.avatar && <Icon className={styles.avatar}>person</Icon>}
              {user.avatar && (
                <div
                  className={styles.avatar}
                  style={{
                    background: `url(${user.avatar})`,
                  }}></div>
              )}

              {!changeAvatar ? (
                <button onClick={() => setChangeAvatar(true)}>
                  CHANGE PHOTO
                </button>
              ) : (
                <>
                  <ImageUpload title="Change avatar" callBack={avatarUpdate} />
                  <button
                    onClick={() => {
                      setChangeAvatar(false);
                      getPosts();
                    }}>
                    ACCEPT
                  </button>
                </>
              )}
              <div className="row">
                {user.gitNickname &&
                  user.stacks &&
                  user.stacks.map((stack) => (
                    <div
                      className={styles.langIco}
                      style={{
                        background: `url(/langs/${stack}.png)`,
                      }}>
                      <div className={`row centered ${styles.tooltip}`}>
                        {stack}
                      </div>
                    </div>
                  ))}
              </div>
              {user.gitNickname ? (
                <button
                  className={`row centered ${styles.gitButton}`}
                  onClick={() => setTab("git")}>
                  <img
                    src="/git-icon.svg"
                    alt="git"
                    className={styles.gitIcon}
                  />
                  <span>View Git</span>
                </button>
              ) : (
                <div className={`row centered ${styles.gitForm}`}>
                  <input
                    type="text"
                    placeholder="Your git nickname.."
                    value={gitNick}
                    onChange={(e) => setGitNick(e.target.value)}
                  />
                  <button onClick={() => updateUser({ gitNickname: gitNick })}>
                    Save
                  </button>
                </div>
              )}
            </div>
            <div className={`column centered`}>
              <h1>
                {user.name} {user.surname}
              </h1>
              <h3>{user.nickname}</h3>
            </div>
          </div>
        </div>
        <div className={`column ${styles.userPosts}`}>
          <UserPosts />
        </div>
      </div>
    );
  } else {
    return <Git onClose={closeGit} nickname={user.gitNickname} />;
  }
};

export default Profile;
