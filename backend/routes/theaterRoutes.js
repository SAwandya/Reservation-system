const express = require("express");
const Theater = require("../models/theater");

const router = express.Router();

// Create a new theater
router.post("/", async (req, res) => {
  try {
    const theater = new Theater(req.body);
    await theater.save();
    res.status(201).json(theater);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all theaters
router.get("/", async (req, res) => {
  try {
    const theaters = await Theater.find();
    res.json(theaters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a theater by ID
router.get("/:id", async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) return res.status(404).json({ error: "Theater not found" });
    res.json(theater);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a theater by ID
router.put("/:id", async (req, res) => {
  try {
    const theater = await Theater.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!theater) return res.status(404).json({ error: "Theater not found" });
    res.json(theater);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a theater by ID
router.delete("/:id", async (req, res) => {
  try {
    const theater = await Theater.findByIdAndDelete(req.params.id);
    if (!theater) return res.status(404).json({ error: "Theater not found" });
    res.json({ message: "Theater deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
