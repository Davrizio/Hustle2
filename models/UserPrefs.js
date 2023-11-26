const mongoose = require("mongoose");

const UserPrefsSchema = new mongoose.Schema({
  dark: {
    type: String,
  },

  light: {
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

module.exports = mongoose.model("UserPrefs", UserPrefsSchema);
