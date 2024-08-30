import React, { useState } from 'react'

export default function SeatsConfirmation() {
  const [selectedSeats] = useState(['A1', 'A2'])
  const theatre = { name: 'Awesome Cinema', location: 'Downtown' }
  const showtime = { time: '7:00 PM', date: '2024-09-01' }
  const ticketPrice = 12.99
  const taxRate = 0.05
  const totalTicketPrice = selectedSeats.length * ticketPrice
  const totalTax = totalTicketPrice * taxRate
  const totalPrice = totalTicketPrice + totalTax

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="confirmation-container w-1/2 max-w-md p-4 md:p-5 bg-white rounded-lg shadow dark:bg-gray-700">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Seat Confirmation</h2>
        
        <div className="text-gray-900 dark:text-white mb-2">
          <strong>Theatre:</strong> {theatre.name} ({theatre.location})
        </div>
        
        <div className="text-gray-900 dark:text-white mb-2">
          <strong>Showtime:</strong> {showtime.time} ({showtime.date})
        </div>
        
        <div className="text-gray-900 dark:text-white mb-2">
          <strong>Selected Seats:</strong> {selectedSeats.join(', ')}
        </div>
        
        <div className="text-gray-900 dark:text-white mb-2">
          <strong>Ticket Price (each):</strong> ${ticketPrice.toFixed(2)}
        </div>
        
        <div className="text-gray-900 dark:text-white mb-2">
          <strong>Total Ticket Price:</strong> ${totalTicketPrice.toFixed(2)}
        </div>
        
        <div className="text-gray-900 dark:text-white mb-2">
          <strong>Tax ({(taxRate * 100).toFixed(2)}%):</strong> ${totalTax.toFixed(2)}
        </div>
        
        <div className="text-gray-900 dark:text-white mt-4 text-lg">
          <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
        </div>
        
        <button className="mt-4 bg-green-700 p-2 rounded-lg text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Proceed to payment
        </button>
      </div>
    </div>
  )
}
