import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import SeatSelection from "../components/SeatSelection";
import Calender from "../components/Calender";
import DateScroller from "../components/DateScroller";
import ImageSlider from "../components/ImageSlider";

const HomePage = () => {
  return (
    <Box>
      <ImageSlider/>
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
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
            <DateScroller />
            <Calender />
          </Box>
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
        ><SeatSelection/></Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
