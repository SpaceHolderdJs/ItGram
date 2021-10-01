import React from "react";
import Form from "./systems/Form";

import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";

const Login = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const login = (data) => {
    fetch("/login", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        !data.err
          ? dispatch({ type: "INIT_USER", payload: data.user })
          : dispatch({
              type: "INIT_TOAST",
              payload: { msg: data.err, type: "err", time: 5 },
            });
      });
  };

  return (
    <div className="column centered">
      <h1>Login</h1>
      <Form
        inputs={[{ name: "email" }, { name: "password", type: "password" }]}
        action={login}
      />
      {user && <Redirect to={`/user/${user._id}`} />}
    </div>
  );
};

export default Login;
