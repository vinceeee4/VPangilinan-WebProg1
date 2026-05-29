const express = require("express");
const {
  recordArticleSelection,
  getArticleSelections,
  getMyArticleSelections,
} = require("../controllers/articleSelectionController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(protect, recordArticleSelection)
  .get(protect, authorize("admin"), getArticleSelections);

router.get("/me", protect, getMyArticleSelections);

module.exports = router;
