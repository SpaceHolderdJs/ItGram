import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Toast from "./Toast";
import ImageUpload from "./ImageUpload";

import styles from "../../styles/form.module.css";

const Form = ({ inputs, action }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const [toast, setToast] = useState(false);

  const isAllFilled = () => {
    const fields = Object.values(formData);
    return (
      fields.length === inputs.length && fields.every((item) => item.length > 0)
    );
  };

  return (
    <div className={`column centered ${styles.form}`}>
      {inputs.map((input, inx) => (
        <div className={`row centered ${styles.inpWrapper}`} key={inx}>
          <span>{"[" + input.name + "]"}</span>
          <input
            type={input.type || "text"}
            placeholder={input.name}
            onChange={(e) => {
              setFormData({ ...formData, [input.name]: e.target.value });
            }}
          />
        </div>
      ))}
      <button
        className={isAllFilled() && styles.active}
        onClick={() =>
          !isAllFilled()
            ? dispatch({
                type: "INIT_TOAST",
                payload: {
                  msg: "Fill all fields",
                  type: "succ",
                  time: 5,
                },
              })
            : action(formData)
        }>
        Submit
      </button>
      {toast && <Toast toast={toast} />}
    </div>
  );
};

export default Form;
