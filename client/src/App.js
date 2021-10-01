import { useEffect } from "react";

import "./App.css";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "./components/systems/Header";
import Main from "./components/Main";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Toast from "./components/systems/Toast";
import Application from "./components/Application";

import { initScene } from "./scene";

function App() {
  const toast = useSelector((store) => store.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    initScene();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        {toast && <Toast />}
      </div>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Registration />
        </Route>
        <Route path="/user/:id">
          <Application />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
