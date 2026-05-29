import API from "./api";

export const recordArticleSelection = (articleId) =>
  API.post("/article-selections", { articleId });

export const getAllArticleSelections = () => API.get("/article-selections");

export const getMyArticleSelections = () => API.get("/article-selections/me");
