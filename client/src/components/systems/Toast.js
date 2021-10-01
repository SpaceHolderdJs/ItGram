import React, { useEffect } from "react";
import styles from "../../styles/toast.module.css";

import { useSelector, useDispatch } from "react-redux";

const Toast = () => {
  const toast = useSelector((store) => store.toast);
  const dispatch = useDispatch();

  const { type, msg, time } = toast;

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST" });
    }, time * 1000);
  }, []);

  return (
    <div className={`row centered ${styles.toast} ${type && styles[type]}`}>
      <span>{msg}</span>
    </div>
  );
};

export default Toast;
