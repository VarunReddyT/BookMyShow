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

router.get('/getshowtimes', async (req, res) => {
    const showtimes = await ShowTime.find();
    res.send(showtimes);
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