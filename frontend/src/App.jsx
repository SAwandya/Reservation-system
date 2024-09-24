import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/HomePage'
import Layout from './pages/Layout'
import MoviePostForm from './components/MoviePostForm'

function App() {

  return (
    <>
      <MoviePostForm />
    </>
  );
}

export default App
