const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReservationSchema = new Schema({
    date : { type: Date, required: true },
    startAt : { type: String, required: true },
    seats : { type: Array, required: true },
    totalSeats : { type: Number, required: true },
    orderId : { type: String, required: true },
    ticketPrice : { type: Number, required: true },
    total : { type: Number, required: true },
    movieId : { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    theatreId : { type: Schema.Types.ObjectId, ref: 'Theatre', required: true },
    name : { type: String, required: true },
    phone : { type: String, required: true },
});

module.exports = mongoose.model('Reservation', ReservationSchema);