import React from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import SideBarButton from "./SideBarButton";
import { useAuth } from "../Context/AuthContext";

const SideBar = ({ setActiveContent, activeContent }) => {
  const drawerWidth = 240;

  const {logout} = useAuth();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "300px",
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Typography
        sx={{
          marginTop: "29px",
          fontSize: "30px",
          fontWeight: "bold",
          color: "#381aa3",
          textAlign: "center", // Center text alignment
        }}
      >
        Dashboard
      </Typography>
      <Box
        sx={{
          p: 2,
          marginTop: "20px",
          display: "flex", // Use flex display
          flexDirection: "column", // Arrange items in a column
          alignItems: "center", // Center align items
        }}
      >
        <SideBarButton
          activeContent={activeContent}
          setActiveContent={setActiveContent}
          title="Layout"
        />

        <SideBarButton
          activeContent={activeContent}
          setActiveContent={setActiveContent}
          title="Department"
        />

        <SideBarButton
          activeContent={activeContent}
          setActiveContent={setActiveContent}
          title="Profile"
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#8A6BFF",
            width: "252px",
            height: "30px",
            marginTop: "auto", // Push logout button to the bottom
            borderRadius: "5px",
          }}
          onClick={logout}
          fullWidth
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default SideBar;
