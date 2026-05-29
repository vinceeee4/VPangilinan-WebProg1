const express = require("express");
const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");
const { protect, optionalAuth, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(optionalAuth, getArticles)
  .post(protect, authorize("admin", "editor"), createArticle);

router.get("/:name", optionalAuth, getArticle);

router
  .route("/:id")
  .put(protect, authorize("admin", "editor"), updateArticle)
  .delete(protect, authorize("admin"), deleteArticle);

module.exports = router;
