import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SeatSelection from "./components/SeatSelection";
import MoviePostForm from "./components/MoviePostForm";
import RegisterForm from "./pages/RegisterForm";
import SignInForm from "./pages/SignInForm";
import ShowtimeForm from "./components/showTimeForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/moviedetails/:id",
        element: <MovieDetailsPage />,
      },
      {
        path: "/seatselection",
        element: <SeatSelection />,
      },
    ],
  },

  {
    path: "/moviepostform",
    element: <MoviePostForm />,
  },
  {
    path: "/showtimeform",
    element: <ShowtimeForm />,
  },

  {
    path: "/signup",
    element: <RegisterForm />,
  },

  {
    path: "/signin",
    element: <SignInForm />,
  },
]);

export default router;
