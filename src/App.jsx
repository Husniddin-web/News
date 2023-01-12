import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { api } from "./API/api";
import { Main, Navbar } from "./components";
import { getItem } from "./helpers/persintence";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { loginUserSuccess } from "./slice/auth";
import ArticleDetail from "./pages/ArticleDetail";
import CreateArticle from "./pages/CreatArticle";
import Error from "./pages/Error";
import EditArticle from "./pages/EditArticle";

const App = () => {
  const token = getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      api.getUser(token).then((res) => {
        dispatch(loginUserSuccess(res.data.user));
      });
    }
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="article/:id" element={<ArticleDetail />} />
        <Route path="*" element={<Error />} />
        <Route path="/error" element={<Error />} />
        <Route path="/createarticle" element={<CreateArticle />} />
        <Route path="/editarticle/:slug" element={<EditArticle />} />
      </Routes>
    </>
  );
};

export default App;
