import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { TextField, Button, MenuItem, IconButton, Typography } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import axios from "axios";
import useTheaters from "../hooks/useTheaters";

const AdminShowTimeForm = () => {
  const { control, handleSubmit, reset } = useForm({
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
    try {
      // Transform formData.times to just an array of time strings
      const formattedData = {
        ...formData,
        times: formData.times.map((item) => item.time),
      };

      await axios.post("/api/showtimes", formattedData);
      alert("Showtime created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating showtime", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Theater Dropdown */}
      <Typography variant="h4">Create Showtimes</Typography>
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
          />
        )}
      />

      {/* Times Input (Dynamic Array) */}
      <div>
        <label>Times:</label>
        {fields.map((item, index) => (
          <div key={item.id} style={{ display: "flex", alignItems: "center" }}>
            <Controller
              name={`times[${index}].time`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={`Time ${index + 1}`}
                  fullWidth
                  margin="normal"
                  required
                />
              )}
            />
            <IconButton
              onClick={() => remove(index)}
              aria-label="remove time"
              color="secondary"
            >
              <RemoveIcon />
            </IconButton>
          </div>
        ))}
        <Button
          type="button"
          variant="outlined"
          onClick={() => append({ time: "" })}
          startIcon={<AddIcon />}
          style={{ marginTop: "10px" }}
        >
          Add Time
        </Button>
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
      >
        Submit
      </Button>
    </form>
  );
};

export default AdminShowTimeForm;
