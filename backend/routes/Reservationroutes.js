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

            return {
                ...reservation._doc,
                movieName: movie ? movie.title : 'Unknown Movie',
                theatreName: theatre ? theatre.name : 'Unknown Theatre',
                qrCodeDataUrl: reservation.qrcode // Assuming qrCode field contains the URL
            };
        }));

        // Generate HTML to send back with QR codes
        const html = reservationsWithDetails.map(reservation => `
            <div>
                <h1>Ticket Details</h1>
                <p><strong>Order ID:</strong> ${reservation.orderId}</p>
                <p><strong>Movie:</strong> ${reservation.movieName}</p>
                <p><strong>Theatre:</strong> ${reservation.theatreName}</p>
                <p><strong>Date:</strong> ${reservation.date}</p>
                <p><strong>Time:</strong> ${reservation.startAt}</p>
                <p><strong>Seats:</strong> ${reservation.seats.join(', ')}</p>
                <p><strong>Total Price:</strong> ${reservation.total}</p>
                <h2>QR Code</h2>
                <img src="${reservation.qrcode}" alt="QR Code">
            </div>
        `).join('<hr>'); // Join each reservation with a horizontal rule

        // Send HTML response
        res.setHeader('Content-Type', 'text/html');
        res.send(html);

        // Send JSON response
        res.json(reservationsWithDetails);

    } catch (err) {
        console.error("Error retrieving reservations:", err);
        res.status(500).send("Error retrieving reservations");
    }
});
module.exports = router;