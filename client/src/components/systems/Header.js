import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "../../styles/header.module.css";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  console.log(user);

  if (!user) {
    return (
      <header className={`row ${styles.header}`}>
        <div className="row centered">
          <Link to="/main">Main</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Registration</Link>
        </div>
      </header>
    );
  } else {
    return (
      <header className={`row centered ${styles.header}`}>
        <div className={`row centered ${styles.linksWrapper}`}>
          <Link to="/main">Main</Link>
          <Link to="/register">Registration</Link>
        </div>
        <div className={`row centered ${styles.profileWrapper}`}>
          <h3>
            {user.name} {user.surname}
          </h3>
          <button
            onClick={() => {
              dispatch({ type: "REMOVE_USER" });
            }}>
            Logout
          </button>
        </div>
      </header>
    );
  }
};

export default Header;
