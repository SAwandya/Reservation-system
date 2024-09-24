import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

// Sample list of dates
const dates = [
  "Mon 25 Sep",
  "Tue 26 Sep",
  "Wed 27 Sep",
  "Thu 28 Sep",
  "Fri 29 Sep",
  "Sat 30 Sep",
  "Sun 1 Oct",
  "Mon 2 Oct",
  "Tue 3 Oct",
  "Wed 4 Oct",
  "Thu 5 Oct",
  "Fri 6 Oct",
  "Sat 7 Oct",
  "Sun 8 Oct",
];

const DateScroller = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [scrollIndex, setScrollIndex] = useState(0);

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
