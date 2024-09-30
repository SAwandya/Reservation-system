import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  CircularProgress,
  Typography,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import useGameQueryStore from "../store";

const TheaterForm = () => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/theaters"); // Replace with your API endpoint
        setTheaters(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTheaters();
  }, []);

   const setSelectedTheater = useGameQueryStore((s) => s.SetSelectedTheater);

   const selectedTheater = useGameQueryStore((s) => s.selectedTheater);

  const handleTheaterChange = (event) => {
    setSelectedTheater(event.target.value);
    console.log("Selected theater:", event.target.value);
    // You can add additional logic here if needed, such as sending this value to an API
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}
    >
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Error loading theaters</Typography>
      ) : (
        <TextField
          select
          label="Select Theater"
          value={selectedTheater}
          onChange={handleTheaterChange}
          fullWidth
          variant="outlined"
          required
          
        >
          {theaters.map((theater) => (
            <MenuItem key={theater._id} value={theater._id}>
              {theater.name}
            </MenuItem>
          ))}
        </TextField>
      )}
    </Box>
  );
};

export default TheaterForm;
