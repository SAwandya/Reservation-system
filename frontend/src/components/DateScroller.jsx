import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import useShowtimes from "../hooks/useShowTimes";
import axios from "axios";

const DateScroller = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const movieId = "66f40f14832f5e199d719894";
  const theaterId = "66f431f9114c8d537ff71c4a";

  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/showtimes",
          {
            params: {
              movieId,
              theaterId,
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

    if (movieId && theaterId) {
      fetchShowtimes();
    }
  }, [movieId, theaterId]);

  const dates = showtimes
    .map((showtime) =>
      showtime.dateTime.map((dateTime) => dateTime.split("T")[0])
    ) // Extract the date part
    .flat();

  // Function to handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Function to handle left and right scroll buttons
  const scrollLeft = () => {
    setScrollIndex((prev) => Math.max(prev - 1, 0));
  };

  const scrollRight = () => {
    setScrollIndex((prev) => Math.min(prev + 1, dates.length - 5));
  };

  return (
    <Box display="flex" alignItems="center" sx={{ width: "100%" }}>
      {/* Left Scroll Button */}
      <Button onClick={scrollLeft} disabled={scrollIndex === 0}>
        <ArrowBack />
      </Button>

      {/* Date Scroller */}
      <Box
        display="flex"
        sx={{
          overflowX: "auto",
          scrollBehavior: "smooth",
          width: "80%",
          padding: "10px",
          "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in webkit browsers
          msOverflowStyle: "none", // Hide scrollbar in IE and Edge
          scrollbarWidth: "none", // Hide scrollbar in Firefox
        }}
      >
        {dates.slice(scrollIndex, scrollIndex + 5).map((date, index) => (
          <Button
            key={index}
            onClick={() => handleDateClick(date)}
            variant={selectedDate === date ? "contained" : "outlined"}
            sx={{
              minWidth: "100px",
              marginRight: "10px",
              whiteSpace: "nowrap",
              fontSize: "14px",
            }}
          >
            {date}
          </Button>
        ))}
      </Box>

      {/* Right Scroll Button */}
      <Button onClick={scrollRight} disabled={scrollIndex >= dates.length - 5}>
        <ArrowForward />
      </Button>
    </Box>
  );
};

export default DateScroller;
