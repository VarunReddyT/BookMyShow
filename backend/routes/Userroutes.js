const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Theatre = require('../models/Theatre');
const router = express.Router();
router.post('/register', async (req, res) => {
  const { username, password, name, mobilenumber,email} = req.body;
  const role = 'customer';
  const user = await User.findOne({ username});
  if (user) return res.status(401).send('User already exists');
  const hashedPassword = await bcrypt.hash(password, 10);
  const users = new User({ username, password: hashedPassword, role,name,mobilenumber,email });

  try {
    const savedUser = await users.save();
    res.send(savedUser);
    console.log("User saved successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password);
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send('Email or password is wrong');
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');
  const token = jwt.sign({ id: user._id, role : user.role }, 'bms',{expiresIn: '1h'});
  res.header('Authorization', token).send(token);
});
//register Theatre
router.post('/theatreregister', async (req, res) => {
  const { name, city, seats, image, facilities } = req.body;
  const theatre = await Theatre.findOne({name});
  if (theatre) return res.status(401).send('Theatre already exists');
  const theatres = new Theatre({ name, city, seats, image, facilities });
  try {
    const savedTheatre = await theatres.save();
    res.send(savedTheatre);
    console.log("Theatre saved successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});


module.exports = router;