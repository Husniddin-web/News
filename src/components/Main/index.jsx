import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Article from "../../components/Articles";
import Loader from "../UI/Loader";
import { api } from "../../API/api";
import "./index.scss";
import {
  getArticleSuccess,
  getArticleStart,
  getArticleFailure,
} from "../../slice/article";
const index = () => {
  const { isLoading } = useSelector((state) => state.article);
  const dispatch = useDispatch();
  const getArticle = async () => {
    dispatch(getArticleStart());
    try {
      const data = await api
        .getArticle()
        .then((res) => dispatch(getArticleSuccess(res.data.articles)))
        .catch((er) => console.log(er));
      return data;
    } catch (error) {
      dispatch(getArticleFailure(error));
    }
  };
  const deleteHandler = async (token, id) => {
    if (token) {
      try {
        const data = await api.deleteArticle(token, id);
        getArticle();
      } catch (error) {
        alert("You can not this article ");
      }
    }
  };
  useEffect(() => {
    getArticle();
  }, []);
  return (
    <div className="container">
      <div className="loader ">{isLoading ? <Loader /> : ""}</div>
      <div className="album p-5 ">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <Article deleteHandler={deleteHandler} />
        </div>
      </div>
    </div>
  );
};

export default index;
