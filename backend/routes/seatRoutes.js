const express = require("express");
const { Seat } = require("../models/seat");

const router = express.Router();

// Create a new seat
router.post("/", async (req, res) => {
  try {
    const { theaterId, selectedSeats } = req.body;

    // Loop through selectedSeats and update the availability
    for (const seat of selectedSeats) {
      const [section, row, col] = seat.split("-");
      const seatNumber = parseInt(col) + 1;

      console.log("Row:", row);
      console.log("Seat Number:", seatNumber);
      console.log("Section:", section);

      // Find and update the seat availability
      // await Seat.findOneAndUpdate(
      //   {
      //     theater: theaterId,
      //     row: String.fromCharCode(65 + parseInt(row)),
      //     number: seatNumber,
      //     section: section,
      //   },
      //   { isAvailable: false }
      // );
       const newSeat = new Seat({
         theater: theaterId, // Use theaterId from the request
         row,
         number: seatNumber,
         section,
         isAvailable: true, // You can change this based on your business logic
       });

       await newSeat.save();
    }

    return res.status(200).json({ message: "Seats booked successfully" });
  } catch (error) {
    console.error("Error booking seats:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all seats
router.get("/", async (req, res) => {
  try {
    const seats = await Seat.find().populate("theater");
    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a seat by ID
router.get("/:id", async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) return res.status(404).json({ error: "Seat not found" });
    res.json(seat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a seat by ID
router.put("/:id", async (req, res) => {
  try {
    const seat = await Seat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!seat) return res.status(404).json({ error: "Seat not found" });
    res.json(seat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a seat by ID
router.delete("/:id", async (req, res) => {
  try {
    const seat = await Seat.findByIdAndDelete(req.params.id);
    if (!seat) return res.status(404).json({ error: "Seat not found" });
    res.json({ message: "Seat deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
