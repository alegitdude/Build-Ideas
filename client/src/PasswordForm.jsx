import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { errorResponseAlert, genericSuccessAlert } from "./Alerts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PasswordForm = (state) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const navigate = useNavigate();
  const handleChange = async (e) => {
    setPassword(e.target.value);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const { email } = Object.fromEntries(formData);
    if (!email) {
      errorResponseAlert("Please Provide an Email");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post("/api/v1/auth/forgot-password", {
        email,
      });
      setLoading(false);
      genericSuccessAlert(
        "Check your email for a link to reset your password!"
      );
      navigate("/landing");
    } catch (error) {
      navigate("/landing");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const { password } = Object.fromEntries(formData);

    if (!password) {
      errorResponseAlert("Please enter a password!");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post("/api/v1/auth/reset-password", {
        password,
        token: query.get("token"),
        email: query.get("email"),
      });
      setLoading(false);
      genericSuccessAlert("Password successfully reset!");
      navigate("/landing");
    } catch (error) {
      setLoading(false);
      navigate("/landing");
    }
  };
  if (loading) {
    return <Loader />;
  }
  if (state.state === "reset") {
    return (
      <div className="reset-container">
        <form onSubmit={handleSubmit} className="password-form  ">
          <h1 className="login-title">Password Reset</h1>

          <div className="login-form-row">
            <label className="login-form-label" id="password">
              New Password
            </label>
            <input
              name="password"
              className="login-input"
              type="password"
              id="password"
            ></input>
          </div>
          <button className="login-submit btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
  if (state.state === "forgot") {
    return (
      <div className="reset-container">
        <form onSubmit={handleReset} className="password-form  ">
          <h1 className="login-title">Send Reset Email</h1>

          <div className="login-form-row">
            <label className="login-form-label" id="password">
              Email
            </label>
            <input
              name="email"
              className="login-input"
              type="email"
              id="email"
            ></input>
          </div>
          <button className="login-submit btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
};
export default PasswordForm;
