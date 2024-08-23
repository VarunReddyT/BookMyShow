const express = require('express');
const Theatre = require('../models/Theatre');
const router = express.Router();

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

router.get('/gettheatres', async (req, res) => {
    const theatres = await Theatre.find();
    res.send(theatres);
}
);
//get theatre by movie

router.get('/gettheatre/:movie', async (req, res) => {
    const theatres = await Theatre.find({movie:req.params.movie});
    res.send(theatres);
}
);
router.get('/gettheatre/:city', async (req, res) => {
    const theatres = await Theatre.find({city:req.params.city});
    res.send(theatres);
}
);

router.put('/updatetheatre', async (req, res) => {
    const { name, city, seats, image, facilities } = req.body;
    const theatres = await Theatre({name,city,seats,image,facilities});
    if (!theatres) return res.status(401).send('Theatre not found');
    try {
        const savedTheatre = await theatres.save();
        res.send(savedTheatre);
        console.log("Theatre updated successfully");
    } catch (err) {
        res.status(400).send(err);
    }
});
module.exports = router;