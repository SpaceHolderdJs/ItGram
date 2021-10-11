import React from "react";
import { Icon } from "@material-ui/core";

import { useDispatch } from "react-redux";

import styles from "../../styles/user.module.css";

const User = ({ user }) => {
  const { avatar, name, surname, nickname } = user;

  const dispatch = useDispatch();

  return (
    <div className={`row centered ${styles.user}`}>
      {avatar ? (
        <div
          style={{ background: `url(${avatar})` }}
          className={`${styles.avatar}`}
          onClick={() =>
            dispatch({ type: "INIT_CURR_PROFILE", payload: user })
          }></div>
      ) : (
        <Icon fontSize="large">person</Icon>
      )}
      <div className="column">
        <h3>{nickname}</h3>
        <span>
          {name} {surname}
        </span>
      </div>
    </div>
  );
};

export default User;
