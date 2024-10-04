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
} from "@mui/material";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users"); // API to get users
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  // Function to handle delete
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`); // API to delete user
      setUsers(users.filter((user) => user._id !== userId)); // Remove deleted user from the state
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return (
      <Typography sx={{ textAlign: "center", mt: 5 }}>Loading...</Typography>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 800, margin: "auto", mt: 5 }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", my: 3 }}>
        Admin User Table
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
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
                    sx={{ textTransform: "none" }}
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
  );
};

export default AdminUserTable;
