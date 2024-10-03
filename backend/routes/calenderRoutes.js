const axios = require("axios");
const express = require("express");
const router = express.Router();
const {User} = require("../models/user");

router.post("/create-calendar-event", async (req, res) => {
  const { userId, bookingDate, bookingTime } = req.body;

  console.log(userId, bookingDate, bookingTime);

  try {
    const user = await User.findById(userId); // Fetch the user and access token

    if (!user || !user.accessToken) {
      return res
        .status(401)
        .json({ error: "User not authenticated or token missing" });
    }

    const event = {
      summary: "Seat Booking Reminder",
      description: `Reminder for your seat booking on ${bookingDate}`,
      start: {
        dateTime: `${bookingDate}T${bookingTime}:00`,
        timeZone: "Asia/Colombo", 
      },
      end: {
        dateTime: `${bookingDate}T22:40:00`, // End time 2 hours later
        timeZone: "Asia/Colombo",
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, 
          { method: "popup", minutes: 10 }, 
        ],
      },
    };

    // const event = {
    //   summary: "Seat Booking Reminder",
    //   description: "Reminder for your seat booking on 2024-10-03",
    //   start: {
    //     dateTime: "2024-10-06T14:00:00",
    //     timeZone: "Asia/Colombo",
    //   },
    //   end: {
    //     dateTime: "2024-12-05T16:00:00",
    //     timeZone: "Asia/Colombo",
    //   },
    //   reminders: {
    //     useDefault: false,
    //     overrides: [
    //       {
    //         method: "email",
    //         minutes: 1440,
    //       },
    //       {
    //         method: "popup",
    //         minutes: 10,
    //       },
    //     ],
    //   },
    // };


    const response = await axios.post(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      event,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res
      .status(200)
      .json({ message: "Event created", event: response.data });
  } catch (error) {
    console.error("Error creating calendar event:", error);
    return res.status(500).json({ error: "Failed to create calendar event" });
  }
});

module.exports = router;