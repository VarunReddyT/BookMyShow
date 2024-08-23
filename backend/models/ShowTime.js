const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowtimeSchema = new Schema({
    ticketPrice: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    movieId: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    theatreId: { type: Schema.Types.ObjectId, ref: 'Theatre', required: true },
    showTime: { type: String, required: true },
    screen: { type: String, required: true },
    seats: { 
        type: Map, 
        of: Boolean, 
        default: {} 
    },
});

module.exports = mongoose.model('Showtime', ShowtimeSchema);
