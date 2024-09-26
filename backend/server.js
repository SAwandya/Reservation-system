const { default: mongoose } = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const movieRoutes = require("./routes/movieRoutes");
const theaterRoutes = require("./routes/theaterRoutes");
const seatRoutes = require("./routes/seatRoutes");
const showtimeRoutes = require("./routes/showTimeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const admin = require("./routes/admin");
const auth = require("./routes/auth");

mongoose
  .connect(
    "mongodb+srv://sachilaawandya:sachila20000816@cluster0.jpluo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB", err));

app.use(cors()); // Enable CORS for all routes

// Increase payload size for JSON and URL-encoded form data
app.use(express.json({ limit: '10mb' })); // Set the limit (e.g., 10MB)
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/api/movies", movieRoutes);
app.use("/api/theaters", theaterRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/showtimes", showtimeRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", admin);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
