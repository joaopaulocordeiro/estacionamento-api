const express = require('express');
const car = require('../routes/car');
const parkingSpace = require('../routes/parkingSpace');
const numbersOfPlaces = require('../routes/numbersOfPlaces');
const rental = require('../routes/rental');
const exitParking = require('../routes/exitParking');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/cars', car);
    app.use('/api/parkingSpace', parkingSpace);
    app.use('/api/numbersOfPlaces', numbersOfPlaces);
    app.use('/api/rental', rental);
    app.use('/api/', exitParking);
};