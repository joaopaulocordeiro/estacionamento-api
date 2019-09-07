const express = require('express');
const router = express.Router();
const {Car, validate} = require('../models/car');

//POST
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const car = new Car({
        name: req.body.name,
        year: req.body.year,
        licensePlate: req.body.licensePlate,
    });
    await car.save();
    res.send(car);
});

//GET BY ID
router.get('/:id', async (req, res) => {
    const car = await Car.findById(req.params.id);
    if(!car) return res.status(404).send('Car ID is not found...')
});

//GET ALL
router.get('/', async (req, res) => {
    const car = await Car.find().sort('name');
    res.send(car);
})

//DELETE
router.delete('/:id', async (req, res) => {
    const car = await Car.findByIdAndRemove(req.params.id);
    if(!car) return res.status(404).send('Car ID is not Found...')
})

//export to index
module.exports = router;