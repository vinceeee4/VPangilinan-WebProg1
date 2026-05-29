const Article = require("../models/Article");

const getArticles = async (req, res) => {
  const canManageArticles = ["admin", "editor"].includes(req.user?.type);
  const filter = canManageArticles ? {} : { isActive: true };
  const articles = await Article.find(filter).sort({ createdAt: -1 });
  res.json({ articles });
};

const getArticle = async (req, res) => {
  const article = await Article.findOne({ name: req.params.name });

  const canManageArticles = ["admin", "editor"].includes(req.user?.type);

  if (!article || (!article.isActive && !canManageArticles)) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.json(article);
};

const createArticle = async (req, res) => {
  const article = await Article.create(req.body);
  res.status(201).json(article);
};

const updateArticle = async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.json(article);
};

const deleteArticle = async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.json({ message: "Article permanently deleted", article });
};

module.exports = {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};
