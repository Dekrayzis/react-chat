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
import ProtectedRoute from "./components/ProtectedRoute";

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
        history.push("/login");
      }
    });
  }, []);

  return (
    <div className="app">
      <Switch>
        <Route path={"/login"} exact component={LoginScreen} />
        <Route path={"/rooms/:roomId"} exact component={Chat} />
        <ProtectedRoute path={"/rooms"} component={Chat} />
      </Switch>
    </div>
  );
}

export default App;
