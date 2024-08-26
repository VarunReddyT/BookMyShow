import React from 'react'
import Theatreseats from './components/Theatreseats.jsx'
import Theatre from './components/th.jsx'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tickets" element={<Theatreseats />} />
          <Route path="/theatre" element={<Theatre />} />
          <Route path="/showtime" element={<ShowTime />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
