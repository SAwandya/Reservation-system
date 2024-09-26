import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/HomePage'
import Layout from './pages/Layout'
import MoviePostForm from './components/MoviePostForm'
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { AuthProvider } from "./Context/AuthContext";


function App() {

  return (
    <>
      <AuthProvider>
        {" "}
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App
