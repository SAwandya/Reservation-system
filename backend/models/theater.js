// models/Theater.js
const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    totalScreens: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Theater", theaterSchema);
