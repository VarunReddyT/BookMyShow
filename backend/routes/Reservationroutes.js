const express = require('express');
const Movie = require('../models/Movie');
const Reservation = require('../models/Reservation');
const Theatre = require('../models/Theatre');
const Showtime = require('../models/ShowTime');
const auth = require('../middleware/auth');
const QRCode = require('qrcode');
const router = express.Router();

// Book the tickets
router.post('/booktickets', auth, async (req, res) => {
    console.log(req.user)
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
    const mobilenumber = req.body.mobilenumber;

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
        reservation.qrcode = await QRCode.toDataURL(qrCodeData);
        
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
//get the reservations of a user
router.get('/gettickets', auth, async (req, res) => {
    if (req.user.role !== 'customer') return res.status(401).send("Unauthorized");

    const userId = req.user._id;

    try {
        // Fetch all reservations for the user
        const reservations = await Reservation.find({ userId });

        // Fetch movie and theatre names for each reservation
        const reservationsWithDetails = await Promise.all(reservations.map(async (reservation) => {
            const movie = await Movie.findById(reservation.movieId);
            const theatre = await Theatre.findById(reservation.theatreId);

            // Format the date to exclude GMT
            const formattedDate = new Date(reservation.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });

            return {
                ...reservation._doc,
                movieName: movie ? movie.title : 'Unknown Movie',
                theatreName: theatre ? theatre.name : 'Unknown Theatre',
                date: formattedDate
            };
        }));

        // Send JSON response
        res.json(reservationsWithDetails);

    } catch (err) {
        console.error("Error retrieving reservations:", err);
        res.status(500).send("Error retrieving reservations");
    }
});
module.exports = router;