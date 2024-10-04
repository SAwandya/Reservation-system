import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Error state for displaying issues

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        setLoading(false);
        return;
      }

      const response = await axios.get("/api/userRoutes", {
        headers: {
          "x-auth-token": token,
        },
      });

      // Ensure response data is an array
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setUsers([]); // Handle case if response is not an array
        console.warn("Response data is not an array:", response.data);
      }

      setLoading(false);
    } catch (err) {
      setError("Error fetching users: " + err.message);
      setLoading(false);
    }
  };

  // Function to handle delete
  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/userRoutes/${userId}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setUsers(users.filter((user) => user._id !== userId)); // Remove deleted user from the state
    } catch (err) {
      setError("Error deleting user: " + err.message);
    }
  };

  if (loading) {
    return (
      <Typography sx={{ textAlign: "center", mt: 5 }}>Loading...</Typography>
    );
  }

  if (error) {
    return (
      <Typography sx={{ textAlign: "center", mt: 5, color: "red" }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ justifyContent: "center", mt: 5, ml: 7 }}>
      <TableContainer
        component={Paper}
        sx={{ width: "80%", borderRadius: "8px", boxShadow: 3 }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", my: 3 }}>
          User Table
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(user._id)}
                      sx={{
                        textTransform: "none",
                        bgcolor: "red.500",
                        "&:hover": { bgcolor: "red.700" },
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminUserTable;
