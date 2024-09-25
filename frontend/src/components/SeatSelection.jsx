import React, { useState } from "react";
import { Box, Grid, Button, Typography, Snackbar } from "@mui/material";
import seatService from "../services/seatService";

const theaterId = "66f431f9114c8d537ff71c4a";
// Simulated seat layout with sections and price
const seatLayout = {
  VIP: [
    [true, true, true, true, true, true],
    [true, true, true, true, true, true],
  ],
  Standard: [
    [true, true, true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true],
    [true, true, true, true, true, true],
  ],
};

const sectionPrices = {
  VIP: 15,
  Standard: 10,
};

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Handle seat selection
  const handleSeatClick = (section, row, col) => {
    const seatId = `${section}-${row}-${col}`;
    console.log("Seat clicked:", selectedSeats);
    if (selectedSeats.includes(seatId)) {
      // Remove from selection
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
      updateTotalPrice(seatId, "remove");
    } else {
      // Add to selection
      setSelectedSeats([...selectedSeats, seatId]);
      updateTotalPrice(seatId, "add");
    }
  };

  // Update total price based on selected seats
  const updateTotalPrice = (seatId, action) => {
    const [section] = seatId.split("-");
    const price = sectionPrices[section];
    setTotalPrice(action === "add" ? totalPrice + price : totalPrice - price);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleConfirm = async () => {
    if (selectedSeats.length > 0) {
      setSnackbarOpen(true);

      seatService
        .CreateSeat({ theaterId, selectedSeats })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error booking seats:", error);
        });
    }
  };

  // Render seats
  const renderSeats = () => {
    return Object.keys(seatLayout).map((section) => (
      <Box key={section} sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {section} Seats - ${sectionPrices[section]}
        </Typography>
        <Grid container justifyContent="center" sx={{ mb: 2 }}>
          {seatLayout[section].map((row, rowIndex) => (
            <Grid
              container
              key={rowIndex}
              justifyContent="center"
              sx={{ mb: 1 }}
            >
              <Grid item sx={{ mr: 1, alignSelf: "center" }}>
                <Typography variant="h6">
                  {String.fromCharCode(65 + rowIndex)}
                </Typography>{" "}
                {/* Row labels A, B, C, ... */}
              </Grid>
              {row.map((isAvailable, colIndex) => {
                const seatId = `${section}-${rowIndex}-${colIndex}`;
                const isSelected = selectedSeats.includes(seatId);

                return (
                  <Button
                    key={colIndex}
                    onClick={() => handleSeatClick(section, rowIndex, colIndex)}
                    disabled={!isAvailable} // Disable if the seat is booked
                    sx={{
                      width: { xs: 30, sm: 40 }, // Adjust width based on screen size
                      height: { xs: 30, sm: 40 }, // Adjust height based on screen size
                      margin: 0.5,
                      backgroundColor: !isAvailable
                        ? "gray" // Booked seats
                        : isSelected
                        ? "green" // Selected seats
                        : "lightblue", // Available seats
                      "&:hover": {
                        backgroundColor:
                          isAvailable && !isSelected ? "blue" : "",
                      },
                    }}
                  />
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Box>
    ));
  };

  return (
    <Box sx={{ textAlign: "center", padding: 2 }}>
      {/* Title */}
      <Typography variant="h4" sx={{ mb: 4 }}>
        Select Your Seats
      </Typography>

      {/* Seat Grid */}
      {renderSeats()}

      {/* Total Price */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Total Price: ${totalPrice}
      </Typography>

      {/* Confirm Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={handleConfirm}
        disabled={selectedSeats.length === 0} // Disable if no seats are selected
      >
        Confirm Selection
      </Button>

      {/* Snackbar for confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={`Seats selected: ${selectedSeats.join(
          ", "
        )}, Total Price: $${totalPrice}`}
      />
    </Box>
  );
};

export default SeatSelection;
