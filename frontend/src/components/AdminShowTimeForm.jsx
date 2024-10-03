import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import useTheaters from "../hooks/useTheaters";
import showTimeService from "../services/showTimeService";

const AdminShowTimeForm = () => {
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      theater: "",
      date: "",
      times: [{ time: "" }],
    },
  });

  const { data } = useTheaters();

  // Manage dynamic times array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "times",
  });

  const onSubmit = async (formData) => {
    const formattedData = {
      ...formData,
      times: formData.times.map((item) => item.time),
    };

    try {
      const response = await showTimeService.Create(formattedData);
      console.log(response.data);
      // Reset form after submission if needed
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Get current time in HH:MM format
  const currentTime = new Date().toTimeString().split(" ")[0].substring(0, 5);

  // Watch the selected date
  const selectedDate = watch("date");

  // Determine minimum time based on selected date
  const minTime = selectedDate === today ? currentTime : "00:00"; // Set to midnight if not today

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#E5D9F2",
        borderRadius: "10px",
        marginTop: "20px",
        marginRight: "70px",
        marginBottom: "40px",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, color: "#5C2FC2", fontWeight: "bold" }}
      >
        Create Showtimes
      </Typography>

      {/* Theater Dropdown */}
      <Controller
        name="theater"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Select Theater"
            fullWidth
            margin="normal"
            required
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
          >
            {data?.map((theater) => (
              <MenuItem key={theater._id} value={theater._id}>
                {theater.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* Date Input */}
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="date"
            label="Date"
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: today, // Prevent selecting past dates
            }}
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
          />
        )}
      />

      {/* Times Input (Dynamic Array) */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Times:</Typography>
        {fields.map((item, index) => (
          <Box
            key={item.id}
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            <Controller
              name={`times[${index}].time`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={`Time ${index + 1}`}
                  fullWidth
                  margin="normal"
                  type="time"
                  required
                  inputProps={{
                    min: minTime, // Set the minimum time based on selected date
                  }}
                  sx={{ backgroundColor: "white", borderRadius: "5px" }}
                />
              )}
            />
            <IconButton
              onClick={() => remove(index)}
              aria-label="remove time"
              color="secondary"
              sx={{ ml: 1 }}
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          type="button"
          variant="outlined"
          onClick={() => append({ time: "" })}
          startIcon={<AddIcon />}
          sx={{ mb: 2 }}
        >
          Add Time
        </Button>
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ backgroundColor: "#5C2FC2", color: "white" }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default AdminShowTimeForm;
