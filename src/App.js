/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

//-- Stylesheet
import "./styles/app.scss";

//-- Views
import LoginScreen from "./views/Login";
import Chat from "./views/Chat";

//-- Store
import { auth } from "./firebase";
import { useStateValue } from "./context/StateProvider";

function App() {
  const history = useHistory();
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((newUser) => {
      if (newUser) {
        // Set user
        dispatch({
          type: "SET_USER",
          user: newUser,
        });
        history.push("/rooms");
      } else {
        // clear user
        dispatch({
          type: "CLEAR_USER",
        });
        history.push("/");
      }
    });
  }, []);

  return (
    <div className="app">
      <Switch>
        <Route path={"/"} exact component={LoginScreen} />
        <Route path={"/rooms/"} exact component={Chat} />
        <Route path={"/rooms/:roomId"} exact component={Chat} />
      </Switch>
    </div>
  );
}

export default App;
