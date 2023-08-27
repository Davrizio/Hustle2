const mongoose = require("mongoose");

const ApptsSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },

  client: {
    type: String,
    required: true,
  },

  note: {
    type: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("appts", ApptsSchema);
