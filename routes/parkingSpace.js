const express = require('express');
const router = express.Router();
const { ParkingSpace, validate } = require('../models/parkingSpace');

//POST
router.post('/', async (req, res) => {
   const {error} = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   
   const parking = new ParkingSpace({
        name: req.body.name
    });
    await parking.save()
    res.send(parking);
});

//GET ALL
router.get('/', async (req, res) => {
    let parking = await ParkingSpace.find().sort('name');
    res.send(parking);
});

//GET BY ID
router.get('/:id', async (req, res) => {
    let parking = await ParkingSpace.findById(req.params.id);
    if (!parking) return res.status(404).send('Parking is not found...')
    res.send(parking);
});

//export to index
module.exports = router;