const mongoose = require("mongoose");

const ClientExSchema = new mongoose.Schema({
  exercise: {
    type: String,
  },
  
  instruction: {
    type: String,
  },

  repititions: {
    type: Number,
  },

  sets: {
    type: Number,
  },

  weight: {
    type: String,
  },

  client: {
    type: String,
  },

  appointment: {
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

module.exports = mongoose.model("clientEx", ClientExSchema);
