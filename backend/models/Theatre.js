const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TheatreSchema = new Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    seats: { type: Number, required: true },
    seatLayout: { type: Array, required: true }, 
    image: { type: String, required: true },
    facilities: { type: Array, required: true },
});

module.exports = mongoose.model('Theatre', TheatreSchema);
