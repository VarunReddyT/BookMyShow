const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Movie = require('../models/Movie');
const router = express.Router();

router.post('/movieregister', async (req, res) => {
    if(req.user.role !== 'admin') return res.status(401).send('Access Denied');
    const { title, image, language, genre, director, trailer, description, duration, startDate, endDate, releaseDate, cast } = req.body;
    const movie = await Movie.findOne({ title });
    if (movie) return res.status(401).send('Movie already exists');
    const movies = new Movie({ title, image, language, genre, director, trailer, description, duration, startDate, endDate, releaseDate, cast });
    try {
        const savedMovie = await movies.save();
        res.send(savedMovie);
        console.log("Movie saved successfully");
    } catch (err) {
        res.status(400).send(err);
    }
});

//show movies if the present date is between start date and end date
router.get('/getmovies', async (req, res) => {
    const movies = await Movie.find({ startDate: { $lte: new Date() }, endDate: { $gte: new Date() } });
    res.send(movies);
});

router.put('/changeenddate', async (req, res) => {
    if(req.user.role !== 'admin') return res.status(401).send('Access Denied');
    const { title, endDate } = req.body;
    const movies = await Movie.findOne({ title });
    if (!movies) return res.status(401).send('Movie not found');
    movies.endDate = endDate;
    try {
        const savedMovie = await movies.save();
        res.send(savedMovie);
        console.log("End date changed successfully");
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/deletemovie', async (req, res) => {
    if(req.user.role !== 'admin') return res.status(401).send('Access Denied');
    const { title } = req.body;
    const movies = await Movie.findOne({ title });
    if (!movies) return res.status(401).send('Movie not found');
    try {
        const deletedMovie = await Movie.deleteOne({ title });
        res.send(deletedMovie);
        console.log("Movie deleted successfully");
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;