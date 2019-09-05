const express = require('express');
const car = require('../routes/car')

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/cars', car);

}