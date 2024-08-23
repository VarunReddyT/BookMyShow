const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/Userroutes');
const movieRoutes = require('./routes/Movieroutes');
const theatreRoutes = require('./routes/Theatreroutes');
// const showTimeRoutes = require('./routes/Showtimeroutes');
const reservationRoutes = require('./routes/Reservationroutes');
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/movie', movieRoutes);
app.use('/theatre', theatreRoutes);
// app.use('/showtime', showTimeRoutes);
app.use('/reservation', reservationRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))



app.listen(4000, () => console.log("Server is running on port 4000"));