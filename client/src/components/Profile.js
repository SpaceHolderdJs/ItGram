import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserPosts from "./UserPosts";

import Icon from "@material-ui/core/Icon";

import styles from "../styles/profile.module.css";

import ImageUpload from "./systems/ImageUpload";

import { Context } from "./Application";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const { updateUser, getPosts } = useContext(Context);

  const [changeAvatar, setChangeAvatar] = useState(false);

  const avatarUpdate = (avatar) => {
    updateUser({ avatar });
  };

  return (
    <div className={`row centered ${styles.profile} container`}>
      <div className={`column ${styles.userInfo}`}>
        <div className="row centered">
          <div className="column centered">
            {!user.avatar && <Icon className={styles.avatar}>person</Icon>}
            {user.avatar && (
              <div
                className={styles.avatar}
                style={{
                  background: `url(${user.avatar})`,
                  backgroundSize: "contain",
                  backgroundPosition: "50% 50%",
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
          </div>
          <div className="column centered">
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
};

export default Profile;
