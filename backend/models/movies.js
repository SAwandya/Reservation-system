// models/Movie.js
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    duration: { type: Number, required: true }, // in minutes
    director: { type: String, required: true },
    cast: [{ type: String }],
    genre: [{ type: String }],
    rating: {
      type: String,
      enum: ["G", "PG", "PG-13", "R", "NC-17"],
      required: true,
    },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
