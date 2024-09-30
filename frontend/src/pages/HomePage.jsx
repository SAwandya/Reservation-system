import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import SeatSelection from "../components/SeatSelection";
import Calender from "../components/Calender";
import DateScroller from "../components/DateScroller";

const HomePage = () => {
  return (
    <Box>
      <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
        Welcome to the Event Planner
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {" "}
          <Calender />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        ><DateScroller/></Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
