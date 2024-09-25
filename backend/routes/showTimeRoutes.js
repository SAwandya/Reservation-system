const express = require("express");
const { Showtime } = require("../models/showtime");

const router = express.Router();

// Create a new showtime
router.post("/", async (req, res) => {
  try {
    const showtime = new Showtime(req.body);
    await showtime.save();
    res.status(201).json(showtime);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const { movieId, theaterId } = req.query;

  try {
    const showtimes = await Showtime.find({
      movie: movieId,
      theater: theaterId,
    });

    res.send(showtimes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a showtime by ID
router.get("/:id", async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.id).populate(
      "movie theater"
    );
    if (!showtime) return res.status(404).json({ error: "Showtime not found" });
    res.json(showtime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a showtime by ID
router.put("/:id", async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!showtime) return res.status(404).json({ error: "Showtime not found" });
    res.json(showtime);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a showtime by ID
router.delete("/:id", async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndDelete(req.params.id);
    if (!showtime) return res.status(404).json({ error: "Showtime not found" });
    res.json({ message: "Showtime deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
