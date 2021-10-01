import React, { useState } from "react";
import { Redirect } from "react-router";
import { useDispatch } from "react-redux";

import Form from "./systems/Form";

const Registration = () => {
  const dispatch = useDispatch();

  const [finish, setFinish] = useState(false);

  const register = (data) => {
    fetch(`/registration`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "INIT_TOAST",
          payload: { msg: data.msg, type: "succ", time: 5 },
        });
        setTimeout(() => {
          setFinish(true);
        }, 2000);
      });
  };

  return (
    <div className="column centered">
      <h1>Register</h1>
      <Form
        inputs={[
          { name: "name" },
          { name: "surname" },
          { name: "nickname" },
          { name: "email" },
          { name: "password", type: "password" },
        ]}
        action={register}
      />
      {finish && <Redirect to="/login" />}
    </div>
  );
};

export default Registration;
