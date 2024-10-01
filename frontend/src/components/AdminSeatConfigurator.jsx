import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  Grid
} from "@mui/material";
import axios from "axios"; // For making API requests
import { v4 as uuidv4 } from "uuid";

const AdminSeatConfigurator = () => {
  const [theater, setTheater] = useState("");
  const [location, setLocation] = useState("");
  const [sections, setSections] = useState([]);
  const [sectionName, setSectionName] = useState("");
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const buttonSize = isSmallScreen ? 18 : 30;

  // Add a new section
  const handleAddSection = () => {
    if (sectionName && rows > 0 && cols > 0) {
      const newSection = {
        id: uuidv4(),
        name: sectionName,
        rows,
        cols,
        layout: Array(rows)
          .fill(null)
          .map(() => Array(cols).fill(true)), // Initialize seats as available
      };
      setSections([...sections, newSection]);
      setSectionName("");
      setRows(0);
      setCols(0);
    }
  };

  // Handle seat toggle (to delete a seat)
  const handleSeatToggle = (sectionId, row, col) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const updatedLayout = [...section.layout];
        updatedLayout[row][col] = !updatedLayout[row][col]; // Toggle availability
        return { ...section, layout: updatedLayout };
      }
      return section;
    });
    setSections(updatedSections);
  };

  // Handle the "Confirm Configuration" button
  const handleConfigure = async () => {
    try {
      const requestBody = {
        location, // Theater location
        theater, // Theater ID or name
        sections, // Sections with seat layouts
      };
        console.log(requestBody);
      const response = await axios.post(
        "http://localhost:3000/api/seats/create",
        requestBody
      );
      console.log(response); // Log success message
    } catch (error) {
      console.error("Error uploading seats:", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Theater Seat Configurator
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          label="Theater Name"
          value={theater}
          onChange={(e) => setTheater(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Theater Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Section Name"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Number of Rows"
          type="number"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Number of Columns"
          type="number"
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleAddSection} sx={{ mb: 4 }}>
          Add Section
        </Button>
      </Box>

      {/* Display Sections */}
      {sections.map((section) => (
        <Box
          key={section.id}
          sx={{
            mb: 4,
            padding: "10px",
            backgroundColor: "#E5D9F2",
            borderRadius: "10px",
          }}
        >
          <Typography sx={{ mb: 2 }}>{section.name} Section</Typography>
          <Grid container justifyContent="center">
            {section.layout.map((row, rowIndex) => (
              <Grid
                container
                key={rowIndex}
                justifyContent="center"
                sx={{ mb: 1 }}
              >
                {row.map((isAvailable, colIndex) => (
                  <Box
                    key={colIndex}
                    onClick={() =>
                      handleSeatToggle(section.id, rowIndex, colIndex)
                    }
                    sx={{
                      width: buttonSize,
                      height: buttonSize,
                      margin: 0.3,
                      backgroundColor: isAvailable ? "#80C4E9" : "gray",
                      "&:hover": {
                        backgroundColor: isAvailable ? "#5C2FC2" : "",
                      },
                      borderRadius: "10px",
                    }}
                  />
                ))}
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      <Button
        variant="contained"
        sx={{ backgroundColor: "#5C2FC2", color: "white" }}
        onClick={handleConfigure}
      >
        Confirm Configuration
      </Button>
    </Box>
  );
};

export default AdminSeatConfigurator;
