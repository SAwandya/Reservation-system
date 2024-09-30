import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Typography, Snackbar } from "@mui/material";
import useSeats from "../hooks/useSeats"; // Adjust the import path based on your structure
import seatService from "../services/seatService";
import useGameQueryStore from "../store";
import LivingTwoToneIcon from "@mui/icons-material/LivingTwoTone";
// const theaterId = "66f431f9114c8d537ff71c4a";

const sectionPrices = {
  VIP: 15,
  Standard: 10,
};

const SeatSelection = () => {
  const theaterId = useGameQueryStore((s) => s.selectedTheater);

  const { data, isLoading, isError } = useSeats(theaterId);
  const [seatLayout, setSeatLayout] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  console.log(seatLayout);

  // Effect to handle seat layout when data changes
  useEffect(() => {
    if (data) {
      const layout = {};
      data.forEach((seat) => {
        const { section, row, number, isAvailable } = seat;

        if (!layout[section]) {
          layout[section] = [];
        }

        const rowIndex = row; // Convert row to zero-based index
        if (!layout[section][rowIndex]) {
          layout[section][rowIndex] = [];
        }

        layout[section][rowIndex][number] = isAvailable; // Column index remains zero-based
      });
      setSeatLayout(layout);
    }
  }, [data]);

  // Handle seat selection
  const handleSeatClick = (section, row, col) => {
    const seatId = `${section}-${row}-${col}`;
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

  // Render loading or error states
  if (isLoading) return <Typography>Loading seats...</Typography>;
  if (isError) return <Typography>Error loading seats!</Typography>;

  // Render seats
  const renderSeats = () => {
    return Object.keys(seatLayout).map((section) => (
      <Box key={section} sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {section} Seats - ${sectionPrices[section]}
        </Typography>
        <Grid container justifyContent="center" sx={{ mb: 2 }}>
          {Object.keys(seatLayout[section]).map((rowKey) => {
            const row = seatLayout[section][rowKey]; // Access seats for the row
            const rowIndex = rowKey; // Use the key directly for row display

            return (
              <Grid
                container
                key={rowKey}
                justifyContent="center"
                sx={{ mb: 1 }}
              >
                <Grid item sx={{ mr: 1, alignSelf: "center" }}>
                  <Typography variant="h6">{rowIndex}</Typography>{" "}
                  {/* Display row letter */}
                </Grid>
                {row.map((isAvailable, colIndex) => {
                  const seatId = `${section}-${rowIndex}-${colIndex}`;
                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <Button
                      key={colIndex}
                      onClick={() => handleSeatClick(section, rowKey, colIndex)}
                      disabled={!isAvailable} // Disable if the seat is booked
                      sx={{
                        width: { xs: 3, sm: 13 },
                        height: { xs: 20, sm: 20 },
                        margin: 0.3,
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
            );
          })}
        </Grid>
      </Box>
    ));
  };

  return (
    <Box sx={{ textAlign: "center", padding: 2 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Select Your Seats
      </Typography>
      {renderSeats()}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Total Price: ${totalPrice}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={handleConfirm}
        disabled={selectedSeats.length === 0}
      >
        Confirm Selection
      </Button>
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
