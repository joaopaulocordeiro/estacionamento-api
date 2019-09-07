const express = require('express');
const router = express.Router();
const {Rental} = require('../models/rental');
const { NumbersOfPlaces } = require('../models/numbersOfPlaces');

router.post('/', async (req, res) => {
    const rental  = await Rental.lookup(req.body.numbersOfPlacesId)
    
    if(!rental) return res.status(404).send('Rental not found');
    if(rental.dateReturned) return res.status(400).send('Returned already processed');

    rental.return()
    await rental.save();

    await NumbersOfPlaces.update ({_id: rental.numbersOfPlacesId._id}, {
        $inc: {spot: 1}
    });

    return res.send(rental);
})

module.exports = router;