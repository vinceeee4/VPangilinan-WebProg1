const Article = require("../models/Article");
const ArticleSelection = require("../models/ArticleSelection");

const selectionPopulate = [
  { path: "user", select: "firstName lastName email type" },
  { path: "article", select: "title name" },
];

const normalizeRole = (role) => (role === "viewer" ? "user" : role);

const formatUserName = (user) =>
  [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
  user.username ||
  user.email;

const recordArticleSelection = async (req, res) => {
  const { articleId } = req.body;

  if (!articleId) {
    return res.status(400).json({ message: "Article ID is required" });
  }

  const article = await Article.findById(articleId);

  if (!article || !article.isActive) {
    return res.status(404).json({ message: "Article not found" });
  }

  const duplicateWindow = new Date(Date.now() - 3000);
  const recentSelection = await ArticleSelection.findOne({
    user: req.user._id,
    article: article._id,
    selectedAt: { $gte: duplicateWindow },
  }).populate(selectionPopulate);

  if (recentSelection) {
    return res.status(200).json({
      message: "Article selection already recorded",
      selection: recentSelection,
    });
  }

  const selection = await ArticleSelection.create({
    user: req.user._id,
    article: article._id,
    articleTitle: article.title,
    userEmail: req.user.email,
    userName: formatUserName(req.user),
    userType: normalizeRole(req.user.type),
  });

  const populated = await ArticleSelection.findById(selection._id).populate(
    selectionPopulate,
  );

  res.status(201).json({
    message: "Article selection recorded",
    selection: populated,
  });
};

const getArticleSelections = async (req, res) => {
  const selections = await ArticleSelection.find({})
    .populate(selectionPopulate)
    .sort({ selectedAt: -1 });

  res.json({ selections });
};

const getMyArticleSelections = async (req, res) => {
  const selections = await ArticleSelection.find({ user: req.user._id })
    .populate(selectionPopulate)
    .sort({ selectedAt: -1 });

  res.json({ selections });
};

module.exports = {
  recordArticleSelection,
  getArticleSelections,
  getMyArticleSelections,
};
