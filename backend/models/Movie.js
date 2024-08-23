const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    language : { type: String, required: true },
    genre: { type: String, required: true },
    director: { type: String, required: true },
    trailer : { type: String, required: true }, 
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    releaseDate: { type: Date, required: true },
    cast: { type: Array, required: true },
});

module.exports = mongoose.model('Movie', movieSchema);