import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../API/api";
import Myinput from "../../components/UI/Myinput";
import { Validation } from "../../components";
import {
  loginUserStart,
  loginUserFailure,
  loginUserSuccess,
} from "../../slice/auth";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const index = () => {
  const [password, setPassword] = useState("");
  const [useremail, setUserEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, loggedIn } = useSelector((state) => state.auth);
  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(loginUserStart());
    const user = { email: useremail, password };
    try {
      const data = await api.userLogin(user);
      dispatch(loginUserSuccess(data.user));
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
      <div className="reg-wrapper mx-auto p-3 ">
        <h3 className="text-center">Login</h3>

        <form className="mt-4">
          <Myinput
            className="form-control mx-auto w-75"
            type="email"
            placeholder="user-email"
            value={useremail}
            onChange={(e) => setUserEmail(e.target.value.trim())}
          />
          {error != null && error.emailOrPassword ? (
            <Validation error={error.emailOrPassword} name={"email"} />
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
            onClick={loginHandler}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default index;
