import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useStateValue } from "../context/StateProvider";

const ProtectedRoute = ({
  path,
  component: Component,
  render,
  ...otherProps
}) => {
  const [{ user }] = useStateValue();
  return (
    <Route
      {...otherProps}
      render={(props) => {
        if (!user.displayName)
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
