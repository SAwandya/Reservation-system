// models/Showtime.js
const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
      required: true,
    },
    dateTime: { type: Date, required: true }, // Show time
    seats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seat" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Showtime", showtimeSchema);
