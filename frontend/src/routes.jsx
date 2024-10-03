import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SeatSelection from "./components/SeatSelection";
import MoviePostForm from "./components/MoviePostForm";
import RegisterForm from "./pages/RegisterForm";
import SignInForm from "./pages/SignInForm";
import ShowtimeForm from "./components/showTimeForm";
import DashboardLayout from "./pages/DashboardLayout";
import Content from "./components/Content";
import BookingDetails from "./pages/BookingDetails";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/moviedetails/:id",
        element: (
          <ProtectedRoute>
            <MovieDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/seatselection",
        element: (
          <ProtectedRoute>
            <SeatSelection />
          </ProtectedRoute>
        ),
      },
      {
        path: "/bookingdetails",
        element: (
          <ProtectedRoute>
            <BookingDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Content />,
      },
    ],
  },

  {
    path: "/moviepostform",
    element: (
      <ProtectedRoute>
        <MoviePostForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/showtimeform",
    element: (
      <ProtectedRoute>
        <ShowtimeForm />
      </ProtectedRoute>
    ),
  },

  {
    path: "/signup",
    element: <RegisterForm />,
  },

  {
    path: "/signin",
    element: <SignInForm />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
