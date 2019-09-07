const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const mongoose = require('mongoose');
const { Rental, validate } = require('../models/rental');
const { Car } = require('../models/car');
const { ParkingSpace } = require('../models/parkingSpace');
const { NumbersOfPlaces } = require('../models/numbersOfPlaces');

Fawn.init(mongoose)


//POST em que o carro estaciona na vaga
router.post('/', async (req, res) => {
    //validacao do rental
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const car = await Car.findById(req.body.carId);
    if(!car) return res.status(404).send('Car is not Found...');

    const parkingSpace = await ParkingSpace.findById(req.body.parkingNameId);
    if(!parkingSpace) return res.status(404).send('Parking Space is not Found...')

    const numbersOfPlaces = await NumbersOfPlaces.findById(req.body.numbersOfPlacesid);
    if(numbersOfPlaces.spots === 0) return res.status(404).send("all vacancies are occupied");

    let rental = new Rental ({
        car:{
            _id: car._id,
            name: car.name,
            year: car.year,
            licensePlate: car.licensePlate,
        },
        parkingSpace:{
            _id: parkingSpace._id,
            name: parkingSpace.name,
        },
        numbersOfPlaces:{
            _id: numbersOfPlaces._id,
            name: numbersOfPlaces.name,
        }
    });
    
    try{
        await new Fawn.Task()
        .save('rental', rental)
        .update('numbersOfPlaces', {_id:numbersOfPlaces._id}, {
        $inc: {spots: -1}
    })
    .run();
    res.send(rental)
    }
    catch(ex){
        res.status(500).send('Something failed in rental post')
    }
});

module.exports = router;