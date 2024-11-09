const { Theater } = require("../models/theater");
const { Booking } = require("../models/booking");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

exports.createBookingEvent = async (req, res) => {
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
    if (!theaterData)
      return res.status(404).json({ error: "Theater not found" });

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

    if (savedBooking) {
      // send email using nodemailer
      let config = {
        service: "gmail",
        auth: {
          user: "nevilnutrifeeds@gmail.com",
          pass: "ugel zylt zrcy fhjb",
        },
      };

      let transpoter = nodemailer.createTransport(config);

      let MailGenerator = new Mailgen({
        them: "default",
        product: {
          name: "ReserveNow",
          link: "https://mailgen.js/",
        },
      });

      let response = {};

      response = {
        body: {
          name: customerName,
          intro: "Your booking has been confirmed!!!",
          table: {
            data: [
              {
                name: customerName,
                Location: theaterName,
                time: bookingTime,
                payment: totalAmount + "LKR",
              },
            ],
          },
          outro: "Looking forward to serve you",
        },
      };

      let mail = MailGenerator.generate(response);

      let message = {
        from: "nevilnutrifeeds@gmail.com",
        to: customerEmail,
        subject: "Booking Confirmation",
        html: mail,
      };

      transpoter
        .sendMail(message)
        .then(() => {
          return res
            .status(201)
            .json({ message: "Booking created successfully", savedBooking });
        })
        .catch((error) => {
          console.log(error.message);
        });

      // ---------------------------
    }
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllBookingsEvent = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookingByCustomerIdEvent = async (req, res) => {
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
};

exports.getBookingByIdEvent = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "showtime seats"
    );
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBookingEvent = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBookingEvent = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
