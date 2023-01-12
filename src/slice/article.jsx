import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  article: [],
  error: null,
  articleDetail: [],
};
export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    getArticleStart: (state, action) => {
      state.isLoading = true;
    },
    getArticleSuccess: (state, action) => {
      (state.isLoading = false), (state.article = action.payload);
    },
    getArticleFailure: (state, action) => {
      state.error = action.payload;
    },
    getArticleDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.articleDetail = action.payload;
    },
    createArticleSuccess: (state, action) => {
      state.isLoading = false;
      state.article.push(action.payload);
    },
    putArticleStart: (state, action) => {
      state.isLoading = true;
    },
    putArticleSuccess: (state, action) => {
      state.isLoading = false;
    },
    putArticleFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const {
  getArticleStart,
  getArticleSuccess,
  getArticleFailure,
  getArticleDetailSuccess,
  createArticleSuccess,
  putArticleStart,
  putArticleSuccess,
  putArticleFailure,
} = articleSlice.actions;
export default articleSlice.reducer;
