// models/Seat.js
const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
      required: true,
    },
    row: { type: String, required: true }, // A, B, C, etc.
    number: { type: Number, required: true }, // Seat number
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seat", seatSchema);
