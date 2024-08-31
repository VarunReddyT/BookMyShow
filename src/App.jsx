import React from 'react'
// import Theatreseats from './components/Theatreseats.jsx'
import Theatre from './components/th.jsx'
import Home from './components/Home.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import ShowTime from './components/ShowTime.jsx'
import MovieRegisterForm from './components/CreateMovie.jsx'
import Theatredashboard from './components/Theatredashboard.jsx'
// import Navbar from './components/Navbar.jsx'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SeatsConfirmation from './components/SeatsConfirmation.jsx'
function App() {

  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/tickets" element={<Theatreseats />} /> */}
          <Route path="/theatre" element={<Theatre />} />
          <Route path="/showtime" element={<ShowTime />} />
          <Route path="/confirmation" element={<SeatsConfirmation />} />
          <Route path="/createmovie" element={<MovieRegisterForm />} />
          <Route path="/theatredashboard" element={<Theatredashboard/>}/>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
