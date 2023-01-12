import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../API/api";
import Myinput from "../../components/UI/Myinput";
import { Validation } from "../../components";

import {
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
} from "../../slice/auth";

import "./index.scss";

const index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, loggedIn, error } = useSelector((state) => state.auth);
  const regHandler = async (e) => {
    e.preventDefault();
    dispatch(loginUserStart());
    const user = { username: name, email, password };
    try {
      const data = await api.userReg(user);
      dispatch(loginUserSuccess(data.user));
      navigate("/");
    } catch (error) {
      dispatch(loginUserFailure(error.response.data.errors));
    }
  };
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);
  return (
    <>
      <div className="login-wrapper mx-auto p-3 bg-info ">
        <h3 className="text-center">Register</h3>
        <div className="error"></div>
        <form className="mt-4">
          <Myinput
            className="form-control mx-auto w-75"
            type="text"
            placeholder="username"
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
          />
          {error != null && error.username ? (
            <Validation error={error.username} name={"username"} />
          ) : (
            ""
          )}
          <Myinput
            type="email"
            placeholder="user-email..."
            className="form-control mx-auto w-75 mt-4"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          {error != null && error.email ? (
            <Validation error={error.email} name={"email"} />
          ) : (
            ""
          )}
          <Myinput
            type="password"
            placeholder="user-password..."
            className="form-control mx-auto w-75 mt-4"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
          />
          {error != null && error.password ? (
            <Validation error={error.password} name={"password"} />
          ) : (
            ""
          )}
          <button
            className="btn btn-success w-25 mx-auto d-block mt-3"
            disabled={isLoading}
            onClick={regHandler}
          >
            {isLoading ? "Sending" : "Register"}
          </button>
        </form>
        <Link to="/login">
          <p className="text-center mt-2">Have you account ?</p>
        </Link>
      </div>
    </>
  );
};

export default index;
