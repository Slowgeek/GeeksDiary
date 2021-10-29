const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
    },
    level: {
      type: String,
      enum: ["Hard", "Medium", "Easy"],
      default: "Medium",
    },
    problem: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      trim: false,
    },
    quick_rev: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    revision_date: {
      type: Date,
      default: Date.now() + 7 * 86400000,
    },
    revised: {
      type: Boolean,
      default: false,
    },
    noted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Notes = mongoose.model("Notes", notesSchema);
module.exports = Notes;
