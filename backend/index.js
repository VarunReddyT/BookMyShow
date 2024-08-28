const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/Userroutes');
const movieRoutes = require('./routes/Movieroutes');
const theatreRoutes = require('./routes/Theatreroutes');
const showTimeRoutes = require('./routes/Showtimeroutes');
const reservationRoutes = require('./routes/Reservationroutes');
const bodyParser = require('body-parser');
dotenv.config();

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))

app.use('/user', userRoutes);
app.use('/movie', movieRoutes);
app.use('/theatre', theatreRoutes);
app.use('/showtime', showTimeRoutes);
app.use('/reservation', reservationRoutes);

app.post('/register', async (req, res) => {
    console.log(req.body);
    const { username, password, name, phone,email} = req.body;
    const role = 'customer';
    const user = await User.findOne({ username});
    if (user) return res.status(401).send('User already exists');
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = new User({ username, password: hashedPassword, role,name,phone,email });
  
    try {
      const savedUser = await users.save();
      res.send(savedUser);
      console.log("User saved successfully");
    } catch (err) {
      res.status(400).send(err);
    }
  });



app.listen(4000, () => console.log("Server is running on port 4000"));