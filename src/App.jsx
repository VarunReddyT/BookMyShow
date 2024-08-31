// import Theatreseats from './components/Theatreseats.jsx'
import Theatre from './components/th.jsx'
import Home from './components/Home.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import ShowTime from './components/ShowTime.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx' // Import the Footer component
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SeatsConfirmation from './components/SeatsConfirmation.jsx'
function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/tickets" element={<Theatreseats />} /> */}
          <Route path="/theatre" element={<Theatre />} />
          <Route path="/showtime" element={<ShowTime />} />
          <Route path="/confirmation" element={<SeatsConfirmation />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer/> {/* Add the Footer component */}
      </Router>
    </>
  )
}

export default App
