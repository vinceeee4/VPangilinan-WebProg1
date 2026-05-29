const mongoose = require("mongoose");

const articleSelectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
    articleTitle: { type: String, required: true, trim: true },
    userEmail: { type: String, required: true, lowercase: true, trim: true },
    userName: { type: String, required: true, trim: true },
    userType: {
      type: String,
      enum: ["admin", "editor", "user"],
      required: true,
    },
    selectedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.ArticleSelection ||
  mongoose.model("ArticleSelection", articleSelectionSchema);
