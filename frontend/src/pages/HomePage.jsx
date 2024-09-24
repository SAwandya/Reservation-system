import React from "react";
import ImageSlider from "../components/ImageSlider";
import CardSlider from "../components/CardSlider";
import { Box, Typography } from "@mui/material";
import '@fontsource/roboto';


const HomePage = () => {
  return (
    <div>
      <ImageSlider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: '20px',
          flexDirection: { xs: "column", sm: "row" }, // Stack vertically on small screens
          alignItems: "center", // Center vertically when in column mode
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "24px", sm: "48px" }, // Smaller font size on small screens
            marginRight: { sm: "10px" }, // Margin only applied in row layout
            marginBottom: { xs: "10px", sm: 0 },
            fontFamily: "'Roboto', sans-serif", // Bottom margin for column layout
          }}
        >
          Now Showing
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "24px", sm: "48px" }, // Smaller font size on small screens
            marginLeft: { sm: "10px" },
            fontFamily: "'Roboto', sans-serif", // Margin only applied in row layout
          }}
        >
          Coming Soon
        </Typography>
      </Box>

      <CardSlider />
    </div>
  );
};

export default HomePage;
