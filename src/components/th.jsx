import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import './css/styles.css';

export default function Theatre() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Replace this with your actual showtime ID
  const showtimeId = '66ced91be191b56c93e67bc4';

  useEffect(() => {
    // Fetch the seat data from the backend using axios
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/showtime/showtime-seats/${showtimeId}`);
        setSeats(Object.entries(response.data.seats)); // Convert the seats object to an array of [seatNumber, status]
      } catch (err) {
        console.error("Error fetching seats:", err);
      }
    };
    fetchSeats();
  }, [showtimeId]);

  const handleNextClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="App">
      <ShowCase />
      <Cinema
        seats={seats}
        selectedSeats={selectedSeats}
        onSelectedSeatsChange={setSelectedSeats}
      />

      <p className="info text-white">
        You have selected <span className="count">{selectedSeats.length}</span> seats
      </p>
      <button 
        className="block w-full next-button mt-4 mb-4 bg-green-700 p-2 rounded-lg md:w-auto text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" 
        type="button"
        onClick={handleNextClick}
      >
        Next
      </button>

      {isModalVisible && (
        <div id="medium-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full">
          <div className="relative w-full max-w-lg max-h-full">
            <div className="relative bg-slate-200 rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Seat Selection
                </h3>
                <button 
                  type="button" 
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
                  onClick={handleCloseModal}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-950">
                  You have selected {selectedSeats.length} seats. Please confirm your selection.
                </p>
              </div>
              <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button 
                  type="button" 
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleCloseModal}
                >
                  Continue
                </button>
                <button 
                  type="button" 
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={handleCloseModal}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ShowCase() {
  return (
    <ul className="ShowCase mt-4">
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
  );
}

function Cinema({ seats, selectedSeats, onSelectedSeatsChange }) {
  function handleSelectedState(seatNumber) {
    const isSelected = selectedSeats.includes(seatNumber);
    if (isSelected) {
      onSelectedSeatsChange(
        selectedSeats.filter(selectedSeat => selectedSeat !== seatNumber)
      );
    } else {
      onSelectedSeatsChange([...selectedSeats, seatNumber]);
    }
  }

  return (
    <div className='bd'>
      <div className="Cinema">
        <div className="seats">
          <div className="upper-txt">
            <p>Premium</p>React
          </div>
          <div className='upper'>
            {seats.slice(0, 200).map(([seatNumber, status]) => {
              const isSelected = selectedSeats.includes(seatNumber);
              return (
                <span 
                  tabIndex="0"
                  key={seatNumber}
                  className={clsx(
                    'seat',
                    isSelected && 'selected',
                    status === 'occupied' && 'occupied'
                  )}
                  onClick={()=>handleSelectedState(seatNumber)}
                >
                  {seatNumber}
                </span>
              );
            })}
          </div>

          <div className="middle-txt">
            <p>Classic</p>
          </div>

          <div className='middle'>
            {seats.slice(250, 450).map(([seatNumber, status]) => {
              const isSelected = selectedSeats.includes(seatNumber);
              return (
                <span
                  tabIndex="0"
                  key={seatNumber}
                  className={clsx(
                    'seat',
                    isSelected && 'selected',
                    status === 'occupied' && 'occupied'
                  )}
                  onClick={() => handleSelectedState(seatNumber)}
                >
                  {seatNumber}
                </span>
              );
            })}
          </div>

          <div className='lower-txt'>
            <p>Recliners</p>
          </div>
          
          <div className='lower'>
            {seats.slice(200, 250).map(([seatNumber, status]) => {
              const isSelected = selectedSeats.includes(seatNumber);
              return (
                <span
                  tabIndex="0"
                  key={seatNumber}
                  className={clsx(
                    'seat',
                    isSelected && 'selected',
                    status === 'occupied' && 'occupied'
                  )}
                  onClick={() => handleSelectedState(seatNumber)}
                >
                  {seatNumber}
                </span>
              );
            })}
          </div>
        </div>
        <div className="screen" />
      </div>
    </div>
  );
}
