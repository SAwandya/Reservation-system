import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const MyBooking = () => {
  const { getCurrentUser } = useAuth();

  const customerEmail = getCurrentUser().email;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/bookings/customer",
          {
            customerEmail: customerEmail,
          }
        );
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerEmail]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ padding: "20px", marginTop: "80px" }}>
      <Typography variant="h4" gutterBottom style={{ fontSize: "2rem" }}>
        My Bookings
      </Typography>

      {orders?.length === 0 ? (
        <Typography style={{ fontSize: "1.25rem" }}>No orders found</Typography>
      ) : (
        <List>
          {orders?.map((order) => (
            <Paper
              key={order._id}
              style={{
                marginBottom: "20px",
                padding: "15px",
                backgroundColor: "#FFE1FF",
              }}
            >
              <ListItem>
                <ListItemText
                  primaryTypographyProps={{ style: { fontSize: "1.2rem" } }}
                  secondaryTypographyProps={{ style: { fontSize: "1.2rem" } }}
                  primary={`Theater: ${order.theaterName}`}
                  secondary={`Seats: ${order.seats.join(
                    ", "
                  )} | Total Amount: $${order.totalAmount}`}
                />
              </ListItem>
              <ListItemText
                secondaryTypographyProps={{
                  style: { fontSize: "1.25rem", marginLeft: "15px" },
                }}
                secondary={`Booking Date: ${order.bookingDate} | Booking Time: ${order.bookingTime}`}
              />
              <Divider />
            </Paper>
          ))}
        </List>
      )}
    </div>
  );
};

export default MyBooking;
