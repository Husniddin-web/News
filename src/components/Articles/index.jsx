import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getItem } from "../../helpers/persintence";

const index = ({ deleteHandler }) => {
  const { article } = useSelector((state) => state.article);
  const { loggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const token = getItem("token");

  return (
    <>
      {article?.map((e) => {
        return (
          <div className="col" key={e.id}>
            <div className="card shadow-sm h-100">
              <svg
                className="bd-placeholder-img card-img-top"
                width="100%"
                height="225"
                xmlns={e.author.image}
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <rect width="100%" height="100%" fill="#55595c"></rect>
                <text x="50%" y="50%" fill="#eceeef" dy=".3em"></text>
              </svg>

              <div className="card-body">
                <p className="card-text fw-bold">{e.title}</p>
                <p className="card-text ">{e.description}</p>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success"
                    onClick={() => navigate(`/article/${e.slug}`)}
                  >
                    View
                  </button>
                  {loggedIn && e.author.username === user.username && (
                    <>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteHandler(token, e.slug)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-info"
                        onClick={() => navigate(`/editarticle/${e.slug}`)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
                <small className="text-muted text-uppercase">
                  {e.author.username}
                </small>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default index;
