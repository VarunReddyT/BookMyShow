const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShowTimeSchema = new Schema({
    ticketPrice: { type: Number, required: true },
    startDate : { type: Date, required: true },
    endDate : { type: Date, required: true },
    movieId : { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    theatreId : { type: Schema.Types.ObjectId, ref: 'Theatre', required: true },
    showTime : { type: String, required: true },
    screen : { type: String, required: true },
})

module.exports = mongoose.model('ShowTime', ShowTimeSchema);