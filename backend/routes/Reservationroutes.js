const express = require('express');
const Movie = require('../models/Movie');
const Reservation = require('../models/Reservation');
const Showtime = require('../models/ShowTime');
const auth = require('../middleware/auth');
const QRCode = require('qrcode');
const router = express.Router();

// Book the tickets
router.post('/booktickets', auth, async (req, res) => {
    if (req.user.role !== 'customer') return res.status(401).send("Unauthorized");

    const { date, startAt, seats, ticketPrice, total, movieId, theatreId, showTimeId } = req.body;

    // Validate input data
    if (!date || !startAt || !seats || !ticketPrice || !total || !movieId || !theatreId || !showTimeId) {
        return res.status(400).send('Missing required fields');
    }

    const totalSeats = seats.length;
    const orderId = Math.random().toString(36).substr(2, 9);
    const userId = req.user._id;
    const name = req.user.name;
    const mobilenumber = req.user.mobilenumber;

    // Check if all seats are available
    const showtime = await Showtime.findById(showTimeId);
    if (!showtime) return res.status(404).send('Showtime not found');
    
    const areSeatsAvailable = seats.every(seat => !showtime.seats.get(seat));
    if (!areSeatsAvailable) return res.status(400).send('Some seats are already booked');

    // Create reservation
    const reservation = new Reservation({
        userId,
        date,
        startAt,
        seats,
        totalSeats,
        orderId,
        ticketPrice,
        total,
        movieId,
        theatreId,
        name,
        mobilenumber
    });

    try {
        // Generate QR code
        const qrCodeData = `
            Order ID: ${orderId}
            Movie ID: ${movieId}
            Theatre ID: ${theatreId}
            Date: ${date}
            Time: ${startAt}
            Seats: ${seats.join(', ')}
            Total Price: ${total}
        `;
        reservation.qrCode = await QRCode.toDataURL(qrCodeData);
        
        // Save reservation
        const savedReservation = await reservation.save();

        // Update showtime seats
        seats.forEach(seat => {
            showtime.seats.set(seat, true);
        });
        await showtime.save();

        res.status(201).send(savedReservation);
        console.log("Tickets booked successfully with QR code generated.");
    } catch (err) {
        console.error("Error booking tickets:", err);
        res.status(500).send("Error booking tickets");
    }
});
