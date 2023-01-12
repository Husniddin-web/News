import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItem } from "../../helpers/persintence";
import Myinput from "../../components/UI/Myinput";
import {
  putArticleFailure,
  putArticleStart,
  putArticleSuccess,
} from "../../slice/article";
import Loader from "../../components/UI/Loader";
import { api } from "../../API/api";
const index = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [body, setBody] = useState("");
  const token = getItem("token");
  const { isLoading } = useSelector((state) => state.article);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editArticle = async () => {
    const article = {
      title,
      body,
      description: descr,
    };
    if (token && title.length > 0 && body.length > 0 && descr.length > 0) {
      dispatch(putArticleStart());
      try {
        const data = await api.editArticle(slug, token, article);
        dispatch(putArticleSuccess());
        navigate("/");
      } catch (error) {
        alert("Some problem creating article");
        dispatch(putArticleFailure(error));
      }
    } else {
      alert("Field input or you have to logged in");
    }
  };
  const getArticle = async () => {
    const data = await api.getArticleDetail(slug);
    setBody(data.data.article.body);
    setTitle(data.data.article.title);
    setDescr(data.data.article.description);
  };
  useEffect(() => {
    getArticle();
  }, [slug]);
  return (
    <>
      <div className="mx-auto w-75 bg-light mt-3 border border-4 p-3">
        {isLoading ? <Loader /> : ""}
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
          onClick={() => editArticle()}
          disabled={isLoading}
        >
          {isLoading ? "Sending" : "Send"}
        </button>
      </div>
    </>
  );
};

export default index;
