const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
router.post('/register', async (req, res) => {
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



module.exports = router;