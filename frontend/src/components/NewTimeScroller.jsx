import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";
import useGameQueryStore from "../store";
import axios from "axios";

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

function formatToCustomISO(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

const TimeScroller = ({ onTimeSelect }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const [availableTimes, setShowtimes] = useState([]);
  const theaterId = useGameQueryStore((s) => s.selectedTheater);
  const date = useGameQueryStore((s) => s.selectedDate);
  const SetSelectedTime = useGameQueryStore((s) => s.SetSelectedTime);
  const convertedDate = formatToCustomISO(date);

  const handleTimeSelect = (time) => {

    SetSelectedTime(time);

    setSelectedTime(time);
    if (onTimeSelect) {
      onTimeSelect(time);
    }
  };

  useEffect(() => {
    const fetchShowtimes = async () => {

      try {
        const response = await axios.get(
          "http://localhost:3000/api/showtimes",
          {
            params: {
              theater: theaterId,
              date: convertedDate,
            },
          }
        );
        setShowtimes(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (theaterId) {
      fetchShowtimes();
    }
  }, [theaterId, date]);

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
          {availableTimes[0]?.times.map((time, index) => (
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
