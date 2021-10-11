import React, { useState, useEffect } from "react";

import { Bar } from "react-chartjs-2";

import { Icon } from "@material-ui/core";

import styles from "../../styles/repo.module.css";

const Repo = ({ repo, setStacks }) => {
  const {
    name,
    pushed_at,
    size,
    topics,
    default_branch,
    homepage,
    watchers_count,
    created_at,
    updated_at,
    owner,
    html_url,
  } = repo;

  const normalizeDate = (d) => (d.toString().length === 2 ? d : "0" + d);

  const pushedDate = new Date(Date.parse(pushed_at));
  const createdDate = new Date(Date.parse(created_at));
  const updatedDate = new Date(Date.parse(updated_at));

  const [commitsArray, setCommitsArray] = useState([]);
  const [langs, setLangs] = useState([]);

  const getCommits = () => {
    fetch(`https://api.github.com/repos/${owner.login}/${name}/commits`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCommitsArray(data);
      });
  };

  const getLangs = () => {
    fetch(`https://api.github.com/repos/${owner.login}/${name}/languages`)
      .then((response) => response.json())
      .then((data) => {
        console.log("!!!", data);
        setLangs(data);
      });
  };

  useEffect(() => {
    getCommits();
    getLangs();
  }, []);

  const [more, setMore] = useState(false);

  return (
    <div className={`column ${styles.repo}`}>
      <div className={`row centered ${styles.header}`}>
        <h3>{name}</h3>
        <div className="row centered">
          <img src="/git-icon.svg" alt="git" />
          <a href={html_url}>View</a>
        </div>
      </div>
      {homepage && <a href={homepage}>View</a>}
      <span className="row">
        <Icon>call_merge</Icon> {default_branch}
      </span>
      <span className="row">
        <Icon>remove_red_eye</Icon> {watchers_count || 0}
      </span>
      <div className={`row ${styles.dateWrapper}`}>
        <span className={styles.orange}>
          Created: {normalizeDate(createdDate.getDate())}.
          {normalizeDate(createdDate.getMonth())}.{createdDate.getFullYear()}
        </span>
        <span className={styles.grey}>
          Pushed: {normalizeDate(pushedDate.getDate())}.
          {normalizeDate(pushedDate.getMonth())}.{pushedDate.getFullYear()}
        </span>
        <span className={styles.green}>
          Last update: {normalizeDate(updatedDate.getDate())}.
          {normalizeDate(updatedDate.getMonth())}.{updatedDate.getFullYear()}
        </span>
      </div>
      <span>Size: {size} kb</span>
      {topics && (
        <div className={`row ${styles.topics}`}>
          {topics.map((topic) => (
            <span>{topic}</span>
          ))}
        </div>
      )}

      {Object.keys(langs).map((lang, i) => {
        const percents =
          (Object.values(langs)[i] * 100) /
          Object.values(langs).reduce((acc, e) => (acc += e));

        return (
          <div className={`row centered ${styles.langWrapper}`}>
            <span className={`row centered ${styles.iconWrapper}`}>
              <div
                style={{
                  background: `url(/langs/${lang}.png)`,
                }}
                alt="icon"
                className={styles.langIco}></div>
              {lang}
            </span>
            <div className={`row centered ${styles.langWrapper}`}>
              <div
                className={styles.progress}
                style={{
                  width: percents + "px",
                }}></div>
              <span>{percents.toFixed(1)}%</span>
            </div>
          </div>
        );
      })}

      <button onClick={() => setMore(!more)} className="row centered">
        <Icon>{!more ? "arrow_drop_down" : "arrow_drop_up"}</Icon> Commits (
        {commitsArray && commitsArray.length})
      </button>

      {more && commitsArray.length > 0 && (
        <Bar
          data={{
            labels: commitsArray.map((c) => c.commit.message),
            datasets: [
              {
                label: "Commits",
                data: commitsArray.map((c, i) => i + 1),
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
                borderRadius: 20,
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default Repo;
