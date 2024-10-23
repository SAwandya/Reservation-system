import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";

const ScrollerWrapper = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: "280px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: "16px",
  padding: "15px",
  margin: "20px auto",
  border: "1px solid rgba(255, 255, 255, 0.1)",
}));

const ScrollerContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "400px",
  backgroundColor: "rgba(255, 255, 255, 0.02)",
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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

const SelectionHighlight = styled(Box)({
  position: "absolute",
  width: "calc(100% - 20px)",
  height: "45px",
  left: "10px",
  top: "67.5px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: "8px",
  pointerEvents: "none",
  border: "1px solid rgba(255, 255, 255, 0.1)",
});

const TimeScroller = ({ availableTimes, onTimeSelect }) => {
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
          color: "#e2e8f0",
          fontWeight: 500,
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
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "3px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
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
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
                color:
                  selectedTime === time ? "#fff" : "rgba(255, 255, 255, 0.7)",
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

export default TimeScroller;
