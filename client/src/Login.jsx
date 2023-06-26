import { useState } from "react";
import { provideAllValuesAlert } from "./Alerts";
import { useAppContext } from "./context/Context";
import { useGlobalContext } from "./GlobalContext/Context";
import Loader from "./Loader";
import { Link, Navigate } from "react-router-dom";
export const Login = () => {
  const { openLogin, openSignup, isLoginOpen, isSignupOpen, closeModal } =
    useAppContext();
  const { loginUser, registerUser } = useGlobalContext();
  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUser = Object.fromEntries(formData);
    const { name, email, password } = newUser;
    if (!name || !email || !password) {
      provideAllValuesAlert();
      return;
    }
    registerUser(newUser);
    closeModal();
    e.currentTarget.reset();
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData);
    const { email, password } = user;
    if (!email || !password) {
      provideAllValuesAlert();
      return;
    }
    loginUser(user);
    e.currentTarget.reset();
  };

  return (
    <div className="login-container">
      <div className="login-tabs">
        <button
          onClick={openLogin}
          className={
            isLoginOpen
              ? "login-tab login-button active-tab"
              : "login-tab login-button"
          }
        >
          Login
        </button>
        <button
          onClick={openSignup}
          className={
            isSignupOpen
              ? "login-tab signup-button active-tab"
              : "login-tab signup-button"
          }
        >
          Sign-Up
        </button>
      </div>

      <form
        onSubmit={handleLogin}
        className={
          isLoginOpen
            ? "modal-form login-form active"
            : "modal-form login-form "
        }
      >
        <h1 className="login-title">Login</h1>

        <div className="login-form-row">
          <label className="login-form-label" id="email">
            Email
          </label>
          <input
            name="email"
            className="login-input"
            type="email"
            id="email"
          ></input>
        </div>
        <div className="login-form-row">
          <label className="login-form-label" id="password">
            Password
          </label>
          <input
            name="password"
            className="login-input"
            type="password"
            id="password"
          ></input>
        </div>
        <button className="login-submit btn" type="submit">
          Login
        </button>
        <span className="forgot">
          Forgot your password? Click&nbsp;
          <Link className="here" to="/user/forgot-password">
            HERE
          </Link>
        </span>
      </form>

      <form
        onSubmit={handleSignup}
        className={
          isSignupOpen
            ? "modal-form signup-form active"
            : "modal-form signup-form"
        }
      >
        <h1 className="login-title">Sign Up</h1>
        <div className="login-form-row">
          <label className="login-form-label" id="name">
            Name
          </label>
          <input
            name="name"
            className="login-input"
            type="text"
            id="name"
          ></input>
        </div>
        <div className="login-form-row">
          <label className="login-form-label" id="email">
            Email
          </label>
          <input
            name="email"
            className="login-input"
            type="email"
            id="email"
          ></input>
        </div>
        <div className="login-form-row">
          <label className="login-form-label" id="password">
            Password
          </label>
          <input
            name="password"
            className="login-input"
            type="password"
            id="password"
          ></input>
        </div>
        <button className="login-submit btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};
