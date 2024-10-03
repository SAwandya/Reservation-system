import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const AllBookings = () => {
  const { getCurrentUser } = useAuth();
  const customerEmail = getCurrentUser().email;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/bookings");
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerEmail]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ padding: "20px", marginRight: "60px" }}>
      <Typography variant="h4" gutterBottom style={{ fontSize: "2rem" }}>
        All Bookings
      </Typography>

      {orders.length === 0 ? (
        <Typography style={{ fontSize: "1.25rem" }}>No orders found</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <Paper
              key={order._id}
              style={{
                marginBottom: "20px",
                padding: "20px",
                backgroundColor: "#FFE1FF",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <ListItemText
                    primaryTypographyProps={{
                      style: { fontSize: "1.5rem", fontWeight: "bold" },
                    }}
                    secondaryTypographyProps={{
                      style: { fontSize: "1.25rem" },
                    }}
                    primary={`Theater: ${order.theaterName}`}
                    secondary={`Seats: ${order.seats.join(
                      ", "
                    )} | Total Amount: $${order.totalAmount}`}
                  />
                </Grid>
                <Grid item xs={12} sm={4} style={{ textAlign: "right" }}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontSize: "1.25rem", fontWeight: "bold" }}
                  >
                    {`Booking Date: ${order.bookingDate}`}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{ fontSize: "1.25rem", fontWeight: "bold" }}
                  >
                    {`Booking Time: ${order.bookingTime}`}
                  </Typography>
                </Grid>
              </Grid>
              <Divider style={{ margin: "10px 0" }} />
              <Typography
                variant="body2"
                style={{ fontSize: "1rem", color: "#555" }}
              >
                Customer Name: {order.customerName}
              </Typography>
              <Typography
                variant="body2"
                style={{ fontSize: "1rem", color: "#555" }}
              >
                Customer Email: {order.customerEmail}
              </Typography>
            </Paper>
          ))}
        </List>
      )}
    </div>
  );
};

export default AllBookings;
