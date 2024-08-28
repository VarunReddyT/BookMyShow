import React, { useState, useEffect } from 'react'
import axios from 'axios'
import clsx from 'clsx'
import './css/styles.css'

export default function Theatre() {
  const [selectedSeats, setSelectedSeats] = useState([])
  const [seats, setSeats] = useState([])

  // Replace this with your actual showtime ID
  const showtimeId = '66c9773649135643ccb194ee'

  useEffect(() => {
    // Fetch the seat data from the backend using axios
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/showtime/showtime-seats/${showtimeId}`)
        setSeats(Object.entries(response.data.seats)) // Convert the seats object to an array of [seat, status]
      } catch (err) {
        console.error("Error fetching seats:", err)
      }
    }
    fetchSeats()
  }, [showtimeId])

  return (
    <div className="App">
      <ShowCase />
      <Cinema
        seats={seats}
        selectedSeats={selectedSeats}
        onSelectedSeatsChange={setSelectedSeats}
      />

      <p className="info">
        You have selected <span className="count">{selectedSeats.length}</span> seats
      </p>
      <button className="next-button">
        Next
      </button>
    </div>
  )
}

function ShowCase() {
  return (
    <ul className="ShowCase">
      <li>
        <span className="seat" /> <small>N/A</small>
      </li>
      <li>
        <span className="seat selected" /> <small>Selected</small>
      </li>
      <li>
        <span className="seat occupied" /> <small>Occupied</small>
      </li>
    </ul>
  )
}

function Cinema({ seats, selectedSeats, onSelectedSeatsChange }) {
  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat)
    if (isSelected) {
      onSelectedSeatsChange(
        selectedSeats.filter(selectedSeat => selectedSeat !== seat)
      )
    } else {
      onSelectedSeatsChange([...selectedSeats, seat])
    }
  }

  return (
    <div className="Cinema">
      <div className="seats">
        <div className="upper-txt">
          <p>Balcony</p>
        </div>
        <div className='upper'>
          {seats.slice(0, 200).map(([seat, isOccupied]) => (
            <span
              tabIndex="0"
              key={seat}
              className={clsx(
                'seat',
                selectedSeats.includes(seat) && 'selected',
                isOccupied && 'occupied',
              )}
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
              onKeyPress={
                isOccupied
                  ? null
                  : e => {
                    if (e.key === 'Enter') {
                      handleSelectedState(seat)
                    }
                  }
              }
            />
          ))}
        </div>

        <div className="middle-txt">
          <p>First Class</p>
        </div>
        <div className='middle'>
          {seats.slice(250, 450).map(([seat, isOccupied]) => (
            <span
              tabIndex="0"
              key={seat}
              className={clsx(
                'seat',
                selectedSeats.includes(seat) && 'selected',
                isOccupied && 'occupied',
              )}
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
              onKeyPress={
                isOccupied
                  ? null
                  : e => {
                    if (e.key === 'Enter') {
                      handleSelectedState(seat)
                    }
                  }
              }
            />
          ))}
        </div>

        <div className='lower-txt'>
          <p>Second Class</p>
        </div>
        <div className='lower'>
          {seats.slice(200, 250).map(([seat, isOccupied]) => (
            <span
              tabIndex="0"
              key={seat}
              className={clsx(
                'seat',
                selectedSeats.includes(seat) && 'selected',
                isOccupied && 'occupied',
              )}
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
              onKeyPress={
                isOccupied
                  ? null
                  : e => {
                    if (e.key === 'Enter') {
                      handleSelectedState(seat)
                    }
                  }
              }
            />
          ))}
        </div>
      </div>
      <div className="screen" />
    </div>
  )
}
