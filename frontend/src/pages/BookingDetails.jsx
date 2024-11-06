import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import Swal from "sweetalert2";
import seatService from "../services/seatService";
import bookingService from "../services/bookingService";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { styled } from "@mui/system";
import { jsPDF } from "jspdf";
import { v4 as uuidv4 } from "uuid"; 

const StyledContainer = styled(Box)(({
  padding: 3,
  maxWidth: 600,
  margin: "auto",
  marginTop: "100px",
  marginBottom: "90px",
}));

const StyledPaper = styled(Paper)(({
  padding: "32px",
  borderRadius: "16px",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
}));

const DetailLabel = styled(Typography)(({
  color: "#e2e8f0",
  fontWeight: 500,
  marginBottom: "8px",
}));

const DetailValue = styled(Typography)(({
  color: "#94a3b8",
  marginBottom: "16px",
  fontSize: "1.1rem",
}));

const ConfirmButton = styled(Button)(({
  backgroundColor: "#5C2FC2",
  color: "#ffffff",
  padding: "12px",
  marginTop: "24px",
  "&:hover": {
    backgroundColor: "#4925A3",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
}));

const ThankYouMessage = styled(Typography)(({
  color: "#3b82f6", // blue color for the thank you message
  textAlign: "center",
  marginTop: "32px",
  fontSize: "1.2rem",
  fontWeight: 600,
}));

const generatePDF = (bookingDataStr, referenceNumber) => {
  const doc = new jsPDF();

  // Add Title
  doc.setFontSize(22);
  doc.setTextColor("#5C2FC2");
  doc.text("Booking Details", 20, 20);

  // Add Reference Number
  doc.setFontSize(12);
  doc.setTextColor("#333");
  doc.text(`Reference Number: ${referenceNumber}`, 20, 30);

  // Add horizontal line below title
  doc.setDrawColor(92, 47, 194);
  doc.setLineWidth(1);
  doc.line(20, 35, 190, 35);

  // Event Details Section
  doc.setFontSize(16);
  doc.setTextColor("#333");
  doc.setFont("helvetica", "bold");
  doc.text("Event Details:", 20, 50);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Event Name: ${bookingDataStr.theaterName}`, 20, 60);
  doc.text(`Date: ${bookingDataStr.bookingDate}`, 20, 70);
  doc.text(`Time: ${bookingDataStr.bookingTime}`, 20, 80);

  // Booking Details Section
  doc.setFontSize(16);
  doc.setTextColor("#333");
  doc.setFont("helvetica", "bold");
  doc.text("Booking Information:", 20, 100);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Total Price: $${bookingDataStr.totalAmount}`, 20, 110);
  doc.text(`Seats: ${bookingDataStr.seats.join(", ")}`, 20, 120);

  // Save the PDF
  doc.save(`Booking_Details_${referenceNumber}.pdf`);
};

const BookingDetails = () => {
  const bookingData = localStorage.getItem("bookingData");
  if (!bookingData) {
    navigate("/"); // Handle error or redirection if no booking data
    return;
  }

  const bookingDataStr = JSON.parse(bookingData);
  const theaterId = bookingDataStr.theater;
  const selectedSeats = bookingDataStr.seats;
  const { getCurrentUser } = useAuth();
  const userId = getCurrentUser()._id;
  const accessToken = getCurrentUser().accessToken;
  const navigate = useNavigate();

  const [referenceNumber, setReferenceNumber] = useState("");

  useEffect(() => {
    const uniqueRef = `REF-${userId}-${Date.now()}-${uuidv4().slice(0, 8)}`;
    setReferenceNumber(uniqueRef);
  }, [userId]);

  const handleConfirm = () => {
    Swal.fire({
      title: "Confirm Booking?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      background: "#1e2a38",
      color: "#e2e8f0",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#5C2FC2",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        // Generate PDF with reference number
        generatePDF(bookingDataStr, referenceNumber);

        // Send booking confirmation email
        axios
          .post(
            "http://localhost:3000/api/send-confirmation-email",
            {
              userId: userId,
              bookingDetails: { ...bookingDataStr, referenceNumber },
            },
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then(() => {
            toast.success("Email sent successfully!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
              transition: Bounce,
            });
            navigate("/");
          })
          .catch((error) => {
            console.error("Error sending email:", error);
            toast.error("Failed to send confirmation email. Please try again.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
              transition: Bounce,
            });
          });

        // Additional backend seat booking and confirmation
        seatService
          .CreateSeat({ theaterId, selectedSeats })
          .then(() => {
            bookingService
              .Create({ ...bookingDataStr, referenceNumber })
              .then(() => {
                toast.success("Booking confirmed", {
                  position: "top-right",
                  autoClose: 5000,
                });
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
    <StyledContainer>
      <ToastContainer />
      <StyledPaper elevation={0}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: "#e2e8f0",
            fontWeight: "600",
            marginBottom: "32px",
            letterSpacing: "0.5px",
            textAlign: "center",
          }}
        >
          Booking Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DetailLabel variant="h6">Reference Number</DetailLabel>
            <DetailValue variant="body1">{referenceNumber}</DetailValue>
          </Grid>

          <Grid item xs={12}>
            <DetailLabel variant="h6">Event Name</DetailLabel>
            <DetailValue variant="body1">{bookingDataStr.theaterName}</DetailValue>
          </Grid>

          <Grid item xs={6}>
            <DetailLabel variant="h6">Date</DetailLabel>
            <DetailValue variant="body1">{bookingDataStr.bookingDate}</DetailValue>
          </Grid>

          <Grid item xs={6}>
            <DetailLabel variant="h6">Time</DetailLabel>
            <DetailValue variant="body1">{bookingDataStr.bookingTime}</DetailValue>
          </Grid>

          <Grid item xs={6}>
            <DetailLabel variant="h6">Total Price</DetailLabel>
            <DetailValue variant="body1">${bookingDataStr.totalAmount}</DetailValue>
          </Grid>

          <Grid item xs={6}>
            <DetailLabel variant="h6">Seats</DetailLabel>
            <DetailValue variant="body1">{bookingDataStr.seats.join(", ")}</DetailValue>
          </Grid>
        </Grid>

        <ConfirmButton variant="contained" onClick={handleConfirm} fullWidth>
          Confirm Booking
        </ConfirmButton>

        <ThankYouMessage>
          Thank You for Using the Reservation System
        </ThankYouMessage>
      </StyledPaper>
    </StyledContainer>
  );
};

export default BookingDetails;
