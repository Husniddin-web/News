import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/news.jpg";
import { removeItem } from "../../helpers/persintence";
import "./style.scss";
import { userLogOut } from "../../slice/auth";
const index = () => {
  const { loggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(userLogOut());
    removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <section className="nav-section">
        <nav className="container">
          <div className="nav-bar ">
            <div className="nav-logos">
              <Link to="/">
                <img src={Logo} alt="logo" className="nav-logo" />
              </Link>
              <span className="nav-title">News 24/7</span>
            </div>
            <div className="nav-login">
              {loggedIn ? (
                <>
                  <p className="m-0 pt-2">{user.username}</p>
                  <Link to="/createarticle">
                    <button className="btn  btn-outline-secondary">
                      CreateArticle
                    </button>
                  </Link>
                  <button
                    className="btn btn-outline-info"
                    onClick={logoutHandler}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="btn  btn-outline-info">Login</button>
                  </Link>
                  <Link to="/register">
                    <button className="btn  btn-outline-danger">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default index;
