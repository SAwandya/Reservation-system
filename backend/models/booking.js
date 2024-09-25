// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    showtime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Showtime",
      required: true,
    },
    seats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seat" }],
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
