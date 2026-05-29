import API from "./api";

export const mapArticleFromApi = (article) => ({
  ...article,
  id: article._id,
  content: Array.isArray(article.content) ? [...article.content] : [],
  description: String(article.content?.[0] ?? "").trim(),
  image: article.imageUrl,
});

export const fetchArticles = () => API.get("/articles");
export const fetchArticle = (name) => API.get(`/articles/${name}`);
export const createArticle = (article) => API.post("/articles", article);
export const updateArticle = (id, article) => API.put(`/articles/${id}`, article);
export const deleteArticle = (id) => API.delete(`/articles/${id}`);
