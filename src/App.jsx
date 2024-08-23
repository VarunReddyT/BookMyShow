import React from 'react'
import Theatreseats from './components/Theatreseats.jsx'
import Home from './components/Home.jsx'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/tickets" element={<Theatreseats />} />
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
