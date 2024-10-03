import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import Swal from "sweetalert2";
import seatService from "../services/seatService";
import bookingService from "../services/bookingService";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const bookSeat = async (bookingDataStr, userId, accessToken) => {
  console.log(accessToken, userId);

  try {
    // Call the backend to create a Google Calendar event
    const response = await axios.post(
      "http://localhost:3000/api/create-calendar-event",
      {
        userId: userId,
        bookingDate: bookingDataStr.bookingDate, // Pass the booking date
        bookingTime: bookingDataStr.bookingTime, // Pass the booking time
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Calendar event created:", response.data);
  } catch (error) {
    console.error("Error booking seat and creating event:", error);
  }
};

const BookingDetails = () => {
  const bookingData = localStorage.getItem("bookingData");

  const bookingDataStr = JSON.parse(bookingData);

  const theaterId = bookingDataStr.theater;
  const selectedSeats = bookingDataStr.seats;
  const { getCurrentUser } = useAuth();
  const userId = getCurrentUser()._id;
  const accessToken = getCurrentUser().accessToken;

  const navigate = useNavigate();

  const handleConfirm = () => {
    Swal.fire({
      title: "Are you want to Confirm?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(bookingDataStr);
        bookSeat(bookingDataStr, userId, accessToken);

        Swal.fire({
          title: "",
          text: "Booking process complted",
          icon: "success",
        });
        seatService
          .CreateSeat({ theaterId, selectedSeats })
          .then((response) => {
            console.log(response.data);
            bookingService
              .Create(bookingDataStr)
              .then((response) => {
                navigate('/');
                console.log(response.data);
              })
              .catch((error) => {
                console.error("Error booking seats:", error);
              });
          })
          .catch((error) => {
            console.error("Error booking seats:", error);
          });
      }
    });
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: "auto" }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Booking Details
        </Typography>

        <Typography variant="h6" component="h2">
          Event Name:
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {bookingDataStr.theaterName}
        </Typography>

        <Typography variant="h6" component="h2">
          Date:
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {bookingDataStr.bookingDate}
        </Typography>

        <Typography variant="h6" component="h2">
          Time:
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {bookingDataStr.bookingTime}
        </Typography>

        <Typography variant="h6" component="h2">
          Total Price:
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          ${bookingDataStr.totalAmount}
        </Typography>

        <Typography variant="h6" component="h2">
          Seats:
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {bookingDataStr.seats}
        </Typography>

        <Button
          variant="contained"
          onClick={handleConfirm}
          color="primary"
          fullWidth
        >
          Confirm Booking
        </Button>
      </Paper>
    </Box>
  );
};

export default BookingDetails;
