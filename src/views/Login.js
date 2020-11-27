/* eslint-disable no-empty-pattern */
import React from "react";
import logo from "../assets/logo.svg";
import "../styles/login.scss";

import { auth, provider } from "../firebase";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../redux/Reducer";

const LoginScreen = () => {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: res.user,
        })
      )
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div class="background">
        <div class="ball-container orange">
          <div class="ball orange" />/
        </div>
        <div class="ball-container red">
          <div class="ball red" />
        </div>
        <div class="ball-container purple">
          <div class="ball purple" />
        </div>
        <div class="ball-container green">
          <div class="ball green" />
        </div>
      </div>
      <div class="card">
        <div class="form-container">
          <div className="login__title">Sign in to CChat</div>
          <div class="form-title">login</div>
          <div class="input first">
            <input id="email" />
            <label class="title" for="email">
              email
            </label>
          </div>
          <div class="input">
            <input id="password" />
            <label class="title" for="password">
              password
            </label>
          </div>
          <div class="info">forgot your password</div>
          <button className="btn-google-signIn" onClick={signIn}>
            Sign in with Google
          </button>
        </div>
        <div class="button-bar">
          <button class="button register">register</button>
          <button class="button sign-in">sign in</button>
        </div>
      </div>
      <img className="app_logo" src={logo} alt="logo" />
      {/* <div className="login__container">
        <img src={logo} alt="logo" />
        <div className="login__text">Sign in to CChat</div>
      </div> */}
    </div>
  );
};

export default LoginScreen;
