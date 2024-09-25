import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SeatSelection from "./components/SeatSelection";
import MoviePostForm from "./components/MoviePostForm";

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

  // {
  //   path: "/signin",
  //   element: <SignInPage />,
  // },
]);

export default router;
