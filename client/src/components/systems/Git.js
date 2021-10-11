import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";

import { Icon } from "@material-ui/core";

import styles from "../../styles/git.module.css";

import { Context } from "../Application";

import Repo from "./Repo";
import Follower from "./Follower";

const Git = ({ onClose, nickname }) => {
  const { updateUser } = useContext(Context);

  const user = useSelector((store) => store.user);

  const [gitData, setGitData] = useState({ repos: null, main: null });
  const [tab, setTab] = useState("repos");

  const getStacks = (repo) => {
    fetch(`https://api.github.com/repos/${nickname}/${repo}/languages`)
      .then((response) => response.json())
      .then((data) => {
        console.log("!!!STACKS", data, Object.keys(data));

        updateUser({
          stacks: Object.keys(data),
        });
      });
  };

  useEffect(() => {
    getInfo();
    getRepos();
    getFollowers();
  }, []);

  const getInfo = () => {
    fetch(`https://api.github.com/users/${nickname}`)
      .then((response) => response.json())
      .then((data) => {
        setGitData((prev) => ({ ...prev, main: data }));
        console.log(data);
      });
  };

  const getRepos = () => {
    fetch(`https://api.github.com/users/${nickname}/repos`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.sort((r1, r2) => r2.size - r1.size);

        setGitData((prev) => ({ ...prev, repos: data }));

        getStacks(data[0].name);
      });
  };

  const getFollowers = () => {
    fetch(`https://api.github.com/users/${nickname}/followers`)
      .then((response) => response.json())
      .then((data) => {
        data.sort((r1, r2) => r2.size - r1.size);
        setGitData((prev) => ({ ...prev, followers: data }));
        console.log(data);
      });
  };

  const headerFragment = (
    <div className={`row centered ${styles.header}`}>
      <button onClick={() => setTab("repos")}>REPOSITORIES</button>
      <button onClick={() => setTab("follows")}>FOLLOWERS</button>
    </div>
  );

  const reposFragment = (
    <div className={`column ${styles.reposWrapper}`}>
      {gitData.repos
        ?.filter((e) => +e.size > 0)
        .map((repo) => (
          <Repo repo={repo} />
        ))}
    </div>
  );

  const followersFragment = (
    <div className={`column ${styles.reposWrapper}`}>
      {gitData.followers?.map((follower) => (
        <Follower follower={follower} />
      ))}
    </div>
  );

  return (
    <div className={`column container`}>
      <div className={`row`}>
        <Icon fontSize="large" onClick={() => onClose()}>
          arrow_back
        </Icon>
      </div>
      <div className={`row ${styles.wrapper}`}>
        {gitData?.main && (
          <div className={`column centered ${styles.userInfoBlock}`}>
            {gitData.main.avatar_url && (
              <img
                src={gitData.main.avatar_url}
                alt="avatar"
                className={styles.avatar}
              />
            )}
            <h3>@{gitData.main.login}</h3>
            <div className={`row centered ${styles.subInfo}`}>
              <span>Followers: {gitData.main.followers || 0}</span>
              <div className={styles.divider}></div>
              <span>Repos: {gitData.main.public_repos || 0}</span>
              <div className={styles.divider}></div>
              <span>Collabolators: {gitData.main.collaborators || 0}</span>
            </div>
            {gitData.main.bio && <p>{gitData.main.bio}</p>}
          </div>
        )}
        <div className={`column ${styles.contentWrapper}`}>
          {headerFragment}
          {tab === "repos" ? reposFragment : followersFragment}
        </div>
      </div>
    </div>
  );
};

export default Git;
