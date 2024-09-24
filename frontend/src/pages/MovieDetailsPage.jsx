import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const MovieDetailsPage = () => {
  return (
    <Card sx={{ maxWidth: 900, margin: "20px auto", padding: 2 }}>
      <Grid container spacing={2}>
        {/* Movie Image on the Left */}
        <Grid item xs={12} md={4}>
          <CardMedia
            component="img"
            height="400"
            image="https://via.placeholder.com/300x400.png?text=Deadpool+%26+Wolverine" // Replace with the actual movie poster image link
            alt="Deadpool & Wolverine"
            sx={{ objectFit: "cover", borderRadius: 2 }}
          />
        </Grid>

        {/* Movie Details on the Right */}
        <Grid item xs={12} md={8}>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom>
              Deadpool & Wolverine
            </Typography>

            <Typography variant="body1" gutterBottom>
              <strong>Rating:</strong> MA15+ (Strong crude sexual humour, bloody
              violence, and coarse language)
            </Typography>

            <Typography variant="body1" gutterBottom>
              <strong>Description:</strong> Marvel’s best frenemies are back on
              screen together. Ryan Reynolds’ hilarious potty mouth and Hugh
              Jackman’s Wolverine will take audiences on a rollercoaster ride of
              action, adventure, humour, and unexpected twists and turns.
            </Typography>

            <Typography variant="body1" gutterBottom>
              <strong>Release Date:</strong> 25/07/2024
            </Typography>

            <Typography variant="body1" gutterBottom>
              <strong>Running Time:</strong> 128 mins
            </Typography>

            <Typography variant="body1" gutterBottom>
              <strong>Director:</strong> Shawn Levy
            </Typography>

            <Typography variant="body1" gutterBottom>
              <strong>Cast:</strong> Morena Baccarin, Emma Corrin, Rob Delaney,
              Hugh Jackman, Matthew Macfadyen, Ryan Reynolds, Karan Soni, Leslie
              Uggams
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MovieDetailsPage;
