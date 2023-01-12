import React, { useEffect } from "react";
import "./index.scss";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { api } from "../../API/api";
import moment from "moment";
import {
  getArticleStart,
  getArticleDetailSuccess,
  getArticleFailure,
} from "../../slice/article";
import { useDispatch, useSelector } from "react-redux";
import Error from "../Error";

const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { articleDetail, isLoading } = useSelector((state) => state.article);
  const { article } = articleDetail;
  console.log(articleDetail);
  const getArticleDetail = async () => {
    dispatch(getArticleStart());
    try {
      const data = await api.getArticleDetail(id);
      console.log(data);
      dispatch(getArticleDetailSuccess(data.data));
    } catch (error) {
      navigate("/error");
    }
  };
  useEffect(() => {
    getArticleDetail();
  }, [id]);
  return (
    articleDetail.length !== 0 && (
      <div className="container">
        <div className="article-wrapper">
          <button
            className="btn btn-danger px-4 my-2"
            onClick={() => navigate("/")}
          >
            Back
          </button>
          <div className="card  w-75 mx-auto mt-5">
            <div className="card-body">
              <h3 className="article-title text-capitalize">{article.title}</h3>
              <p className="article-body">{article.body}</p>
            </div>
            <div className="card-footer">
              <h3 className="auth text-uppercase">{article.author.username}</h3>
              <p className="auth-bio">{article.author.bio}</p>
              <p>
                Created At :{moment(article.createdAt).format(" DD  MMM  YYYY")}
              </p>
            </div>
          </div>
          );
        </div>
      </div>
    )
  );
};

export default index;
