import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";

const ScrollerWrapper = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: "280px",
  backgroundColor: "#E5D9F2",
  borderRadius: "15px",
  padding: "15px",
  margin: "20px auto",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
}));

const ScrollerContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "180px",
  backgroundColor: "#F7F5FB", // Lighter background for contrast
  borderRadius: "12px",
  overflow: "hidden",
  position: "relative",
}));

const TimeWheel = styled(Box)({
  height: "45px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",
  margin: "0 10px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "rgba(92, 47, 194, 0.08)",
  },
});

const SelectionHighlight = styled(Box)({
  position: "absolute",
  width: "calc(100% - 20px)",
  height: "45px",
  left: "10px",
  top: "67.5px",
  backgroundColor: "rgba(92, 47, 194, 0.12)",
  borderRadius: "8px",
  pointerEvents: "none",
  border: "2px solid rgba(92, 47, 194, 0.2)",
});

const NewTimeScroller = ({ availableTimes, onTimeSelect }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    if (onTimeSelect) {
      onTimeSelect(time);
    }
  };

  return (
    <ScrollerWrapper elevation={0}>
      <Typography
        variant="subtitle1"
        sx={{
          textAlign: "center",
          mb: 2,
          color: "#5C2FC2",
          fontWeight: 600,
        }}
      >
        Available Times
      </Typography>
      <ScrollerContainer>
        <SelectionHighlight />
        <Box
          sx={{
            height: "100%",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "rgba(92, 47, 194, 0.05)",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#5C2FC2",
              borderRadius: "3px",
              "&:hover": {
                backgroundColor: "#4925A3",
              },
            },
          }}
        >
          <Box sx={{ height: "67.5px" }} />
          {availableTimes.map((time, index) => (
            <TimeWheel
              key={index}
              onClick={() => handleTimeSelect(time)}
              sx={{
                backgroundColor:
                  selectedTime === time
                    ? "rgba(92, 47, 194, 0.15)"
                    : "transparent",
                color: selectedTime === time ? "#5C2FC2" : "#666",
                fontWeight: selectedTime === time ? 600 : 400,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  letterSpacing: "0.5px",
                }}
              >
                {time}
              </Typography>
            </TimeWheel>
          ))}
          <Box sx={{ height: "67.5px" }} />
        </Box>
      </ScrollerContainer>
    </ScrollerWrapper>
  );
};

export default NewTimeScroller;
