const express = require('express');
const customers = require('../routes/customer')

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/customers', customers);

}