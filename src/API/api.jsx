let BASE_URL = "http://localhost:3000/api";
import axios from "axios";

export const api = {
  userReg: async (user) => {
    const data = await axios.post(`${BASE_URL}/users`, { user });
    return data.data;
  },
  userLogin: async (user) => {
    const response = await axios.post(`${BASE_URL}/users/login`, { user });
    return response.data;
  },
  getUser: async (token) => {
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response;
  },
  getArticle: async () => {
    const data = await axios.get(`${BASE_URL}/articles`);
    return data;
  },
  getArticleDetail: async (id) => {
    const data = await axios.get(`${BASE_URL}/articles/${id}`);
    return data;
  },
  createArticle: async (token, article) => {
    const response = await axios.post(
      `${BASE_URL}/articles`,
      { article },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },
  deleteArticle: async (token, id) => {
    const response = await axios.delete(`${BASE_URL}/articles/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  },
  editArticle: async (slug, token, article) => {
    const response = await axios.put(
      `${BASE_URL}/articles/${slug}`,
      { article },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  },
};
