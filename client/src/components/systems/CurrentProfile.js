import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { Icon } from "@material-ui/core";

import OtherUserProfile from "../systems/OtherUserProfile";

import styles from "../../styles/currentProfile.module.css";

export default function CurrentProfile() {
  const currentProfile = useSelector((store) => store.currentProfile);
  const dispatch = useDispatch();

  return (
    <div className={`column centred ${styles.currentProfile} container`}>
      <div className={`row ${styles.header}`}>
        <Icon
          className={styles.icon}
          onClick={() => dispatch({ type: "REMOVE_CURR_PROFILE" })}
          fontSize="large">
          cancel
        </Icon>
      </div>
      {currentProfile && <OtherUserProfile />}
    </div>
  );
}
