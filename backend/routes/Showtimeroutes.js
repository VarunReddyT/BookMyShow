const express = require('express');
const ShowTime = require('../models/ShowTime');
const router = express.Router();

router.post('/showtimeregister', async (req, res) => {
    const { ticketPrice, startDate, endDate, movieId, theatreId, showTime, screen } = req.body;
    const showtime = await ShowTime.findOne({ showTime });
    if (showtime) return res.status(401).send('Showtime already exists');
    const showtimes = new ShowTime({ ticketPrice, startDate, endDate, movieId, theatreId, showTime, screen });
    try {
        const savedShowtime = await showtimes.save();
        res.send(savedShowtime);
        console.log("Showtime saved successfully");
    } catch (err) {
        res.status(400).send(err);
    }
});
// Get available seats for a showtime
router.get('/showtime-seats/:id', async (req, res) => {
    try {
        const showtimeId = req.params.id;
        const showtime = await ShowTime.findById(showtimeId);

        if (!showtime) return res.status(404).send('Showtime not found');

        // Return the seat map
        res.status(200).json({ seats: showtime.seats });
    } catch (err) {
        console.error("Error retrieving seats:", err);
        res.status(500).send("Error retrieving seats");
    }
});
// Get showtimes for a specific theatre
router.get('/theatre-showtimes/:theatreId', async (req, res) => {
    try {
        const { theatreId } = req.params;
        const showtimes = await ShowTime.find({ theatreId }).populate('movieId', 'title').exec();

        if (!showtimes.length) return res.status(404).send('No showtimes found for this theatre');

        res.status(200).json(showtimes);
    } catch (err) {
        console.error("Error retrieving showtimes:", err);
        res.status(500).send("Error retrieving showtimes");
    }
});
// Get showtimes for a specific movie
router.get('/movie-showtimes/:movieId', async (req, res) => {
    try {
        const { movieId } = req.params;
        const showtimes = await ShowTime.find({ movieId }).populate('theatreId', 'name').exec();

        if (!showtimes.length) return res.status(404).send('No showtimes found for this movie');

        res.status(200).json(showtimes);
    } catch (err) {
        console.error("Error retrieving showtimes:", err);
        res.status(500).send("Error retrieving showtimes");
    }
});
router.put('/updateshowtime', async (req, res) => {
    const { ticketPrice, startDate, endDate, movieId, theatreId, showTime, screen } = req.body;
    const showtimes = await ShowTime({ ticketPrice, startDate, endDate, movieId, theatreId, showTime, screen });
    if (!showtimes) return res.status(401).send('Showtime not found');
    try {
        const savedShowtime = await showtimes.save();
        res.send(savedShowtime);
        console.log("Showtime updated successfully");
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/deleteshowtime', async (req, res) => {
    const { showTime } = req.body;
    const showtimes = await ShowTime.findOne({ showTime });
    if (!showtimes) return res.status(401).send('Showtime not found');
    try {
        const deletedShowtime = await ShowTime.deleteOne({ showTime });
        res.send(deletedShowtime);
        console.log("Showtime deleted successfully");
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;