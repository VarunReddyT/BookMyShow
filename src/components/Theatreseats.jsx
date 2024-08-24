import React, { useState } from 'react'
import clsx from 'clsx'
import './css/styles.css'

const movies = [
  {
    name: 'Avenger',
    price: 10,
    occupied: ['A20', 'A21', 'A30', 'A1', 'A2', 'A8'],
  },
  {
    name: 'Joker',
    price: 12,
    occupied: ['B9', 'B41', 'B35', 'B11', 'B65', 'B26'],
  },
  {
    name: 'Toy story',
    price: 8,
    occupied: ['C37', 'C25', 'C44', 'C13', 'C2', 'C3'],
  },
  {
    name: 'The Lion King',
    price: 9,
    occupied: ['D10', 'D12', 'D50', 'D33', 'D28', 'D47'],
  },
]

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const seats = rows.flatMap(row => Array.from({ length: 25 }, (_, i) => `${row}${i + 1}`))

export default function TheatreSeats() {
  const [selectedMovie, setSelectedMovie] = useState(movies[0])
  const [selectedSeats, setSelectedSeats] = useState([])

  return (
    <div className="App">
      <Movies
        movie={selectedMovie}
        onChange={movie => {
          setSelectedSeats([])
          setSelectedMovie(movie)
        }}
      />
      <ShowCase />
      <Cinema
        movie={selectedMovie}
        selectedSeats={selectedSeats}
        onSelectedSeatsChange={selectedSeats => setSelectedSeats(selectedSeats)}
      />

      <p className="info">
        You have selected <span className="count">{selectedSeats.length}</span>{' '}
        seats for the price of{' '}
        <span className="total">
          {selectedSeats.length * selectedMovie.price}$
        </span>
      </p>
      <button className="next-button">
        Next
      </button>
    </div>
  )
}

function Movies({ movie, onChange }) {
  return (
    <div className="Movies">
      <label htmlFor="movie">Pick a movie</label>
      <select
        id="movie"
        value={movie.name}
        onChange={e => {
          onChange(movies.find(movie => movie.name === e.target.value))
        }}
      >
        {movies.map(movie => (
          <option key={movie.name} value={movie.name}>
            {movie.name} (${movie.price})
          </option>
        ))}
      </select>
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

function Cinema({ movie, selectedSeats, onSelectedSeatsChange }) {
  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat)
    if (isSelected) {
      onSelectedSeatsChange(
        selectedSeats.filter(selectedSeat => selectedSeat !== seat),
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
        {seats.slice(0, 200).map(seat => {
          const isSelected = selectedSeats.includes(seat)
          const isOccupied = movie.occupied.includes(seat)
          return (
            <span 
              tabIndex="0"
              key={seat}
              className={clsx(
                'seat',
                isSelected && 'selected',
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
          )
        })}
        </div>

        <div className="middle-txt">
          <p>First Class</p>
        </div>

        <div className='middle'>
        {seats.slice(250,450).map(seat => {
          const isSelected = selectedSeats.includes(seat)
          const isOccupied = movie.occupied.includes(seat)
          return (
            <span
              tabIndex="0"
              key={seat}
              className={clsx(
                'seat',
                isSelected && 'selected',
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
          )
        })}
        </div>

        <div className='lower-txt'>
          <p>Second Class</p>
        </div>
        
        <div className='lower'>
        {seats.slice(200,250).map(seat => {
          const isSelected = selectedSeats.includes(seat)
          const isOccupied = movie.occupied.includes(seat)
          return (
            <span
              tabIndex="0"
              key={seat}
              className={clsx(
                'seat',
                isSelected && 'selected',
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
          )
        })}
        </div>
      </div>
      <div className="screen" />
    </div>
  )
}
