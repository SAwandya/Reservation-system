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
    dateTime: { type: [Date], required: true },
    times: {
      // Array to store multiple time slots for the show
      type: [String], // Use String or Date depending on your needs
      required: true,
    },
  },
  { timestamps: true }
);

const Showtime = mongoose.model("Showtime", showtimeSchema);

exports.Showtime = Showtime;