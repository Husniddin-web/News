import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../API/api";
import { getItem } from "../../helpers/persintence";
import Myinput from "../UI/Myinput";
import { getArticleStart, createArticleSuccess } from "../../slice/article";
import { Navigate, useNavigate } from "react-router-dom";
const index = () => {
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [body, setBody] = useState("");
  const token = getItem("token");
  const { isLoading, article } = useSelector((state) => state.article);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articleCreate = async (token) => {
    const article = {
      title,
      body,
      description: descr,
    };
    if (token && title.length > 0 && body.length > 0 && descr.length > 0) {
      dispatch(getArticleStart());
      try {
        const data = await api.createArticle(token, article);
        dispatch(createArticleSuccess(data.data.article));
        navigate("/");
      } catch (error) {
        alert("Some problem creating article");
      }
    } else {
      alert("Field input or you have to logged in");
    }
  };
  return (
    <div className="mx-auto w-75 bg-light mt-3 border border-4 p-3">
      <Myinput
        className="form-control w-50 mx-auto "
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value.trim())}
      />

      <Myinput
        className="form-control w-50 mx-auto mt-4"
        placeholder="description"
        value={descr}
        onChange={(e) => setDescr(e.target.value.trim())}
      />
      <div className="mb-3 w-50 mx-auto mt-4">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Example textarea
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="7"
          value={body}
          onChange={(e) => setBody(e.target.value.trim())}
        ></textarea>
      </div>
      <button
        className="btn btn-info  w-50 mx-auto d-block"
        onClick={() => articleCreate(token)}
        disabled={isLoading}
      >
        {isLoading ? "Sending" : "Send"}
      </button>
    </div>
  );
};

export default index;
