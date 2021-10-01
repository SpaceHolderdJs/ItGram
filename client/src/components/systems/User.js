import React from "react";
import { Icon } from "@material-ui/core";

import styles from "../../styles/user.module.css";

const User = ({ user }) => {
  const { avatar, name, surname, nickname } = user;
  return (
    <div className={`row centered ${styles.user}`}>
      {avatar ? (
        <div
          style={{ background: `url(${avatar})` }}
          className={`${styles.avatar}`}></div>
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
