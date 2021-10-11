import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Icon } from "@material-ui/core";

import User from "./User";

import styles from "../../styles/userFinder.module.css";

const Userfinder = () => {
  const users = useSelector((store) => store.users);
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  return (
    <div className={`column centered ${styles.userFinder}`}>
      <div className="row centered">
        <input
          type="text"
          placeholder="Anything..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value && <Icon onClick={() => setValue("")}>cancel</Icon>}
      </div>
      {value && (
        <div className={`column centered ${styles.list}`}>
          {users
            .filter(
              (user) =>
                user.nickname === value ||
                user.name === value ||
                user.gitNickname === value ||
                user.stacks
                  ?.map((st) => st.toLowerCase())
                  .includes(value.toLowerCase())
            )
            .map((user) => (
              <div
                className={`row centered ${styles.userWrapper}`}
                onClick={() => {
                  dispatch({ type: "INIT_CURR_PROFILE", payload: user });
                  setValue("");
                }}>
                <User user={user} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Userfinder;
