const express = require("express");
const Seat = require("../models/seat");

const router = express.Router();

// Create a new seat
router.post("/", async (req, res) => {
  try {
    const seat = new Seat(req.body);
    await seat.save();
    res.status(201).json(seat);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
