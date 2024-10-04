import { useState } from "react";
import { CssBaseline, Typography, Grid } from "@mui/material";
import SideBar from "../Components/SideBar";
import { Outlet } from "react-router-dom";
import { RenderContentProvider } from "../Context/RenderContentContext";
import AdminSeatConfigurator from "../components/AdminSeatConfigurator";
import AdminUserTable from "../components/AdminUserTable.jsx";

const DashboardLayout = () => {
  // State to manage the active content
  const [activeContent, setActiveContent] = useState("Employee");

  // Function to render dynamic content based on button click
  const renderContent = () => {
    switch (activeContent) {
      case "Employee":
        return <AdminSeatConfigurator />;
      case "Department":
        return <AdminUserTable />;
      case "Profile":
        return <Typography variant="h4">Profile Page</Typography>;
      default:
        return <Typography variant="h4">Welcome to the Home Page</Typography>;
    }
  };

  return (
    <Grid container>
      <CssBaseline />

      {/* Sidebar */}
      <Grid item xs={3}>
        <SideBar
          setActiveContent={setActiveContent}
          activeContent={activeContent}
        />
      </Grid>

      {/* Main Content Area */}
      <Grid item xs={9}>
        <RenderContentProvider renderContent={renderContent}>
          <div style={{ width: "100%" }}>
            {/* Your layout components like header, sidebar, etc. */}
            <Outlet />
          </div>
        </RenderContentProvider>
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
