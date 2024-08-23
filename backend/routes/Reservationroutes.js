const express = require('express');
const Movie = require('../models/Movie');
const Reservation = require('../models/Reservation');
const auth = require('../middleware/auth');
const router = express.Router();
//book the tickets
const QRCode = require('qrcode');

router.post('/booktickets', auth, async (req, res) => {
    if (req.user.role !== 'customer') return res.status(401).send("Unauthorized");
    const { date, startAt, seats, ticketPrice, total, movieId, theatreId } = req.body;
    const totalSeats = seats.length;
    const orderId = Math.random().toString(36).substr(2, 9);
    const userId = req.user._id;
    const name = req.user.name;
    const mobilenumber = req.user.mobilenumber;
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
        const qrCodeData = `
            Order ID: ${orderId}
            Movie: ${movieId}
            Theatre: ${theatreId}
            Date: ${date}
            Time: ${startAt}
            Seats: ${seats.join(', ')}
            Total Price: ${total}
        `;
        reservation.qrCode = await QRCode.toDataURL(qrCodeData);
        const savedReservation = await reservation.save();
        res.send(savedReservation);
        console.log("Tickets booked successfully with QR code generated.");
    } catch (err) {
        res.status(400).send(err);
    }
});

//show tickets
router.get('/showtickets',auth, async (req, res) => {
    if(req.user.role !== 'customer') return res.status(401).send("Unauthorized");
    try {
        const reservations = await Reservation.find({ userId: req.user._id });
        res.send(reservations);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/deleteticket',auth, async (req, res) => {
    if(req.user.role !== 'customer') return res.status(401).send("Unauthorized");
    const { orderId } = req.body;
    try {
        const deletedTicket = await Reservation.deleteOne({ orderId });
        res.send(deletedTicket);
        console.log("Ticket deleted successfully");
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;