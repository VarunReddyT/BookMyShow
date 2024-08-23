const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/Userroutes');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))



app.listen(4000, () => console.log("Server is running on port 4000"));