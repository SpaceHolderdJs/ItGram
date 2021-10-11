import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import styles from "../../styles/follower.module.css";

const Follower = ({ follower }) => {
  const users = useSelector((store) => store.users);

  const { avatar_url, login, html_url } = follower;
  const [userData, setUserData] = useState({});

  const dispatch = useDispatch();

  const user = users.find((user) => user.gitNickname === login);

  const getRepos = () => {
    fetch(`https://api.github.com/users/${login}/repos`)
      .then((response) => response.json())
      .then((data) => {
        data.sort((r1, r2) => r2.size - r1.size);
        setUserData((prev) => ({ ...prev, repos: data }));
        console.log(data);
      });
  };

  const getFollowers = () => {
    fetch(`https://api.github.com/users/${login}/followers`)
      .then((response) => response.json())
      .then((data) => {
        data?.sort((r1, r2) => r2.size - r1.size);
        setUserData((prev) => ({ ...prev, followers: data }));
        console.log(data);
      });
  };

  useEffect(() => {
    getFollowers();
    getRepos();
  }, []);

  return (
    <div className={`column ${styles.follower} ${user && styles.avaliable}`}>
      <div className={`row centered ${styles.header}`}>
        <img
          className={styles.avatar}
          src={avatar_url}
          alt="user"
          onClick={() =>
            user
              ? dispatch({ type: "INIT_CURR_PROFILE", payload: user })
              : alert("No user")
          }
        />
        <a href={html_url}>View</a>
      </div>
      <h3>{login}</h3>
      <div className="row centered">
        <span>Repositories: {userData.repos?.length || 0}</span>
        <div className={styles.divider}></div>
        <span>Followers: {userData.followers?.length || 0}</span>
      </div>
    </div>
  );
};

export default Follower;
