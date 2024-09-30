import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import axios from "axios";
import useGameQueryStore from "../store";
import TheaterForm from "./TheaterForm";

function formatToCustomISO(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}T00:00:00.000+00:00`;

  return formattedDate;
}

const DateScroller = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const theaterId = "66f431f9114c8d537ff71c4a";
  
  const theaterId = useGameQueryStore((s) => s.selectedTheater);

  const date = useGameQueryStore((s) => s.selectedDate);

  const convertedDate = formatToCustomISO(date);

  console.log(convertedDate);

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
        console.log(response.data); 
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

  // Function to handle time selection
  const handleTimeClick = (time) => {
    setSelectedDate(time);
  };

  // Function to handle left and right scroll buttons
  const scrollLeft = () => {
    setScrollIndex((prev) => Math.max(prev - 1, 0)); // Decrease by 1 to scroll left
  };

  const scrollRight = () => {
    setScrollIndex((prev) => Math.min(prev + 1, showtimes.length - 1)); // Increase by 1 to scroll right
  };

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error fetching showtimes</Typography>;

  return (
    <>
      <Box display="flex" alignItems="center" sx={{ width: "100%" }}>
        {/* Left Scroll Button */}
        <Button onClick={scrollLeft} disabled={scrollIndex === 0}>
          <ArrowBack />
        </Button>

        {/* Time Scroller */}
        <Box
          display="flex"
          sx={{
            overflowX: "auto",
            scrollBehavior: "smooth",
            width: "80%",
            padding: "10px",
            "::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {showtimes.length > 0 ? (
            showtimes
              .flatMap((showtime) =>
                showtime.times.map((time, timeIndex) => (
                  <Button
                    key={`${showtime._id}-${timeIndex}`} // Use showtime._id to ensure unique keys
                    onClick={() => handleTimeClick(time)}
                    variant={selectedDate === time ? "contained" : "outlined"}
                    sx={{
                      minWidth: "100px",
                      marginRight: "10px",
                      whiteSpace: "nowrap",
                      fontSize: "14px",
                    }}
                  >
                    {time}
                  </Button>
                ))
              )
              .slice(scrollIndex, scrollIndex + 5) // Display 5 time buttons based on scroll index
          ) : (
            <Typography>No showtimes available</Typography>
          )}
        </Box>

        {/* Right Scroll Button */}
        <Button
          onClick={scrollRight}
          disabled={scrollIndex >= showtimes.length - 5}
        >
          <ArrowForward />
        </Button>
      </Box>
        <TheaterForm/>
    </>
  );
};

export default DateScroller;
