import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import Swal from "sweetalert2";
import seatService from "../services/seatService";
import bookingService from "../services/bookingService";

const BookingDetails = () => {
  const bookingData = localStorage.getItem("bookingData");

  const bookingDataStr = JSON.parse(bookingData);

  const theaterId = bookingDataStr.theaterId;
  const selectedSeats = bookingDataStr.seats;

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

        Swal.fire({
          title: "",
          text: "Booking process complted",
          icon: "success",
        });
        // seatService
        //   .CreateSeat({ theaterId, selectedSeats })
        //   .then((response) => {
        //     console.log(response.data);
        //   })
        //   .catch((error) => {
        //     console.error("Error booking seats:", error);
        //   });
        bookingService
          .Create(bookingDataStr)
          .then((response) => {
            console.log(response.data);
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
          {bookingDataStr.theater}
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
