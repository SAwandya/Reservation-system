import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Padding } from "@mui/icons-material";
import useGameQueryStore from "../store";

const CustomCalendar = styled(StaticDatePicker)(({ theme }) => ({
  "& .MuiPickersDay-root": {
    width: 45, 
    height: 45, 
    fontSize: "1.25rem", 
    backgroundColor: "#f5f5f5",
    "&.Mui-selected": {
      backgroundColor: "#1976d2",
      color: "#fff",
    },
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
    
  },
}));

const Calender = () => {

  const SetSelectedDate = useGameQueryStore((s) => s.SetSelectedDate);

  const selectedDate = useGameQueryStore((s) => s.selectedDate);


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: { xs: "90%", sm: "50%" },
          boxShadow: 1,
          padding: 8,
          borderRadius: 6,
        }}
      >
        <Typography variant="h6">Select a Date</Typography>
        <CustomCalendar
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          onChange={(newDate) => SetSelectedDate(newDate)}
          sx={{
            // Increase overall calendar size
            "& .MuiPickerStaticWrapper-root": {
              transform: "scale(1.3)", // Scale up the entire calendar
            },
          }}
        />
        {selectedDate && (
          <Typography variant="body1">
            Selected Date: {selectedDate.format("DD-MM-YYYY")}
          </Typography>
        )}
      </Box>
    </LocalizationProvider>
  );
}

export default Calender;
