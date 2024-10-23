import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import 'react-calendar/dist/Calendar.css';
import useGameQueryStore from '../store';

const CalendarWrapper = styled(Box)({
  display: 'flex',
  width: '100%',
  maxWidth: '800px',
  height: '400px',
  borderRadius: '10px',
  overflow: 'hidden',
});

const SidebarWrapper = styled(Box)({
  width: "30%",
  backgroundColor: "#03346E",
  padding: "20px",
  color: "white",
});

const CalendarContent = styled(Box)({
  width: "70%",
  backgroundColor: "#6EACDA",
  padding: "20px",
  color: "white",
});

const StyledCalendar = styled(Calendar)({
  width: '100%',
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',

  '.react-calendar__navigation': {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },

  '.react-calendar__navigation__label': {
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
  },

  '.react-calendar__navigation__arrow': {
    color: 'white',
    fontSize: '24px',
    background: 'none',
    border: 'none',
  },

  '.react-calendar__month-view__weekdays': {
    textTransform: 'uppercase',
    fontWeight: 'normal',
    fontSize: '14px',
    marginBottom: '10px',
  },

  '.react-calendar__month-view__days__day': {
    color: 'white',
    fontSize: '16px',
  },

  '.react-calendar__tile': {
    padding: '10px',
    backgroundColor: 'transparent',
    borderRadius: '50%',
    '&:enabled:hover, &:enabled:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },

  '.react-calendar__tile--now': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  '.react-calendar__tile--active': {
    backgroundColor: '#ff4081',
  },
});

const CustomCalendar = () => {

  const [date, setDate] = useState(new Date());

  const SetSelectedDate = useGameQueryStore((s) => s.SetSelectedDate);

  console.log("new date: ", date);

  const handleDateChange = (newDate) => {
    setDate(newDate);

    SetSelectedDate(newDate)

    // Format the date to a more readable string
    const formattedDate = {
      day: newDate.getDate(),
      month: newDate.toLocaleString("default", { month: "long" }),
      year: newDate.getFullYear(),
      fullDate: newDate.toISOString(), // Full ISO date string if needed
    };

    // // Pass the formatted date up to parent component
    // if (onDateSelect) {
    //   onDateSelect(formattedDate);
    // }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const day = date.getDate();
      if ([4, 11, 13, 18, 21, 25].includes(day)) {
        return 'highlighted-date';
      }
    }
    return null;
  };

  return (
    <CalendarWrapper>
      <SidebarWrapper>
        <Typography variant="h1" sx={{ fontSize: "72px", fontWeight: "bold" }}>
          02
        </Typography>
        <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
          July
        </Typography>
        <Typography variant="h4">2021</Typography>
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          TO DO
        </Typography>
        <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 1, mb: 1 }}>
          <Typography variant="body2">NOTES TO BE MADE</Typography>
        </Box>
        <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 1 }}>
          <Typography variant="body2">DON'T FORGET ABOUT B-DAY</Typography>
        </Box>
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          SCHEDULE
        </Typography>
        <Grid container spacing={1}>
          {[
            { time: "10:00 - 01:10", task: "CLASSES" },
            { time: "02:00 - 05:00", task: "GAMING" },
            { time: "07:00 - 08:30", task: "HOMEWORK" },
            { time: "10:00 - 12:30", task: "CODING" },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={5}>
                <Typography
                  variant="body2"
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 0.5 }}
                >
                  {item.time}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography
                  variant="body2"
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 0.5 }}
                >
                  {item.task}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </SidebarWrapper>
      <CalendarContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          CALENDAR
        </Typography>
        <StyledCalendar
          onChange={handleDateChange}
          value={date}
          formatShortWeekday={(locale, date) =>
            ["SUN", "MON", "TUS", "WED", "THUR", "FRI", "SAT"][date.getDay()]
          }
          tileClassName={tileClassName}
        />
      </CalendarContent>
    </CalendarWrapper>
  );
};

export default CustomCalendar;