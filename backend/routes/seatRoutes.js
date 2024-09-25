const express = require("express");
const { Seat } = require("../models/seat");

const router = express.Router();

router.get("/:theaterId", async (req, res) => {
  const { theaterId } = req.params;

  try {
    // Fetch all seats for the given theater
    const seats = await Seat.find({ theater: theaterId }).sort({
      section: 1,
      row: 1,
      number: 1,
    });

    // Return seats data directly
    res.json(seats);
  } catch (error) {
    console.error("Error fetching seats:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new seat
router.post("/", async (req, res) => {
  try {
    const { theaterId, selectedSeats } = req.body;

    // Loop through selectedSeats and update the availability
    for (const seat of selectedSeats) {
      const [section, row, col] = seat.split("-");

      const result = await Seat.findOneAndUpdate(
        {
          theater: theaterId,
          row: row,
          number: col,
          section: section,
        },
        { isAvailable: false }
      );
      //  const newSeat = new Seat({
      //    theater: theaterId, // Use theaterId from the request
      //    row,
      //    number: seatNumber,
      //    section,
      //    isAvailable: true, // You can change this based on your business logic
      //  });

      //  await newSeat.save();
    }

    return res.send("Seats booked successfully");
  } catch (error) {
    console.error("Error booking seats:", error);
    return res.status(500).json({ error: "Internal Server Error" });
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
