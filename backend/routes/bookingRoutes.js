const express = require("express");
const { Booking } = require("../models/booking");
const { Theater } = require("../models/theater");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      theater,
      seats, // Array of seat identifiers (can be seat IDs or names)
      customerName,
      customerEmail,
      totalAmount,
      bookingDate,
      bookingTime,
    } = req.body;

    const theaterData = await Theater.findById(theater);
    if(!theaterData) res.status(404).json({ error: "Theater not found" });

    const theaterName = theaterData.name;
    // Create a new booking
    const newBooking = new Booking({
      theater: theater, // Cast the theater ID to ObjectId
      seats: seats.map((seat) => seat),
      customerName,
      customerEmail,
      totalAmount,
      bookingDate,
      bookingTime,
      theaterName,
    });

    const savedBooking = await newBooking.save();

    res
      .status(201)
      .json({ message: "Booking created successfully", savedBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("showtime seats");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/customer", async (req, res) => {
  const { customerEmail } = req.body;

  if (!customerEmail) {
    return res.status(400).json({ error: "Customer email is required" });
  }

  try {
    const bookings = await Booking.find({ customerEmail });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Get a booking by ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "showtime seats"
    );
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a booking by ID
router.put("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a booking by ID
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
