import React from "react";
import {
  Modal,
  Typography,
  Grid,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

const PopupContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "900px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3),
  },
}));

const PopupImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
});

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(2),
  top: theme.spacing(2),
  color: theme.palette.grey[500],
}));

const ContinueButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  width: "100%",
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const EventPopup = ({ open, onClose, event }) => {
  const dummyDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const handleContinue = () => {
    onClose();
    // Smooth scroll to the bottom of the dashboard
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="event-popup"
      aria-describedby="event-description"
    >
      <PopupContent>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        {event && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <PopupImage src={event.image} alt={`Event ${event.id}`} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Event {event.id}
              </Typography>
              <Typography variant="body1" paragraph>
                {event.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dummyDescription}
              </Typography>
              <ContinueButton variant="contained" onClick={handleContinue}>
                Continue
              </ContinueButton>
            </Grid>
          </Grid>
        )}
      </PopupContent>
    </Modal>
  );
};

export default EventPopup;
