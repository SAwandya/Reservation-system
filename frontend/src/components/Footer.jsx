import * as React from "react";
import { Box, Typography, IconButton, Link, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(90deg, rgba(228,177,240,1) 0%, rgba(167,223,119,1) 100%)",
        mt: "auto",
        py: 4,
        px: 3,
        textAlign: "center",
        color: "#1E5128",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "10px",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Company Info */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#191919" }}>
            Dairy Farm
          </Typography>
          <Typography variant="body1" sx={{ color: "#383838" }}>
            Freshness and quality in every product!
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#191919" }}>
            Quick Links
          </Typography>
          <Link href="/" color="inherit" sx={linkStyles}>
            Home
          </Link>
          <br />
          <Link href="/salesorders" color="inherit" sx={linkStyles}>
            My Orders
          </Link>
          <br />
          <Link href="/salescarts" color="inherit" sx={linkStyles}>
            Cart
          </Link>
          <br />
          <Link href="/feedbackpage" color="inherit" sx={linkStyles}>
            Feedback
          </Link>
        </Grid>

        {/* Social Media Links */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#191919" }}>
            Follow Us
          </Typography>
          <Box>
            <IconButton href="https://facebook.com" color="inherit" sx={iconStyles}>
              <FacebookIcon />
            </IconButton>
            <IconButton href="https://twitter.com" color="inherit" sx={iconStyles}>
              <TwitterIcon />
            </IconButton>
            <IconButton href="https://instagram.com" color="inherit" sx={iconStyles}>
              <InstagramIcon />
            </IconButton>
            <IconButton href="https://linkedin.com" color="inherit" sx={iconStyles}>
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ mt: 4, color: "#383838", fontWeight: "bold" }}
      >
        &copy; {new Date().getFullYear()} Dairy Farm. All rights reserved.
      </Typography>
    </Box>
  );
};

// Link styles for quick links with hover effect
const linkStyles = {
  color: "#191919",
  fontWeight: "bold",
  fontSize: "16px",
  textDecoration: "none",
  "&:hover": {
    color: "#388E3C",
    textDecoration: "underline",
  },
};

// Icon styles for social media with hover effect
const iconStyles = {
  color: "#1E5128",
  fontSize: "28px",
  transition: "color 0.3s",
  "&:hover": {
    color: "#388E3C",
  },
};

export default Footer;
